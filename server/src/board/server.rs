use actix::{Actor, Addr, Context, Handler, Message, MessageResponse, Recipient};
use actix_web::{
    body::BoxBody,
    http::{header::ContentType, StatusCode},
    web, Error, HttpRequest, HttpResponse, Responder, ResponseError,
};
use actix_web_actors::ws;
use derive_more::{Display, Error};
use rand::Rng;
use serde::Serialize;
use std::collections::HashMap;

use super::{
    space::{Chat, Space, Update, Widget, DrawnLine},
    user::User,
};

#[derive(Message)]
#[rtype(result = "()")]
pub struct Connect {
    pub user_id: usize,
    pub space_id: usize,
    pub addr: Recipient<Update>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub user_id: usize,
    pub space_id: usize,
}

#[derive(MessageResponse, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SpaceInfo {
    pub space_id: usize,
    pub widgets: Vec<Widget>,
    pub chat: Vec<Chat>,
    pub line: Vec<DrawnLine>,
}

#[derive(Message)]
#[rtype(result = "SpaceInfo")]
pub struct SpaceInfoRequest {
    pub space_id: usize,
}

#[derive(Debug, Clone)]
pub struct BoardServer {
    spaces: HashMap<usize, Space>,
}

impl BoardServer {
    pub fn new() -> BoardServer {
        BoardServer {
            spaces: Default::default(),
        }
    }
}

impl Actor for BoardServer {
    type Context = Context<Self>;
}

impl Handler<Connect> for BoardServer {
    type Result = ();

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        log::info!(
            "user {} connecting to space {}",
            &msg.user_id, &msg.space_id
        );

        if let Some(space) = self.spaces.get_mut(&msg.space_id) {
            space.register(msg.user_id, msg.addr);
            return;
        }

        let mut space = Space::new(msg.space_id);
        space.register(msg.user_id, msg.addr);
        self.spaces.insert(msg.space_id, space);
    }
}

impl Handler<Disconnect> for BoardServer {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _ctx: &mut Self::Context) -> Self::Result {
        log::info!(
            "user {} disconnecting from space {}",
            &msg.user_id, &msg.space_id
        );

        if let Some(space) = self.spaces.get_mut(&msg.space_id) {
            space.unregister(msg.user_id);
        }
    }
}

impl Handler<Update> for BoardServer {
    type Result = ();

    fn handle(&mut self, mut msg: Update, _ctx: &mut Self::Context) -> Self::Result {
        if let Some(space) = self.spaces.get_mut(&msg.space_id) {
            msg.action = space.upsert(msg.action);

            for (user_id, user) in space.users.iter() {
                if msg.user_id != *user_id {
                    user.do_send(msg.clone())
                }
            }
        }
    }
}

impl Handler<SpaceInfoRequest> for BoardServer {
    type Result = SpaceInfo;

    fn handle(&mut self, msg: SpaceInfoRequest, _ctx: &mut Self::Context) -> Self::Result {
        match self.spaces.get(&msg.space_id) {
            Some(space) => SpaceInfo {
                space_id: msg.space_id,
                widgets: space.get_widgets(),
                chat: space.get_chat_history(),
                line: space.get_drawings(),
            },
            None => SpaceInfo {
                space_id: msg.space_id,
                widgets: vec![],
                chat: vec![],
                line: vec![],
            },
        }
    }
}

#[derive(Debug, Display, Error)]
pub enum ServerError {
    #[display(fmt = "The board id is invalid")]
    InvalidBoardId,
}

impl ResponseError for ServerError {
    fn status_code(&self) -> StatusCode {
        match self {
            ServerError::InvalidBoardId => StatusCode::BAD_REQUEST,
        }
    }

    fn error_response(&self) -> HttpResponse<BoxBody> {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(self.to_string())
    }
}

pub async fn connect(
    req: HttpRequest,
    stream: web::Payload,
    server: web::Data<Addr<BoardServer>>,
) -> Result<HttpResponse, Error> {
    let user_id: usize = rand::thread_rng().gen();
    let space_id: &str = match req.match_info().get("id") {
        Some(id) => id,
        None => return Err(Error::from(ServerError::InvalidBoardId)),
    };

    let space_id: usize = match space_id.trim().parse() {
        Ok(id) => id,
        Err(_) => return Err(Error::from(ServerError::InvalidBoardId)),
    };

    ws::start(
        User {
            user_id,
            space_id,
            name: String::from("Tom"),
            color: String::from("blue"),
            addr: server.get_ref().clone(),
        },
        &req,
        stream,
    )
}

pub async fn get_widgets(
    space_id: web::Path<usize>,
    server: web::Data<Addr<BoardServer>>,
) -> impl Responder {
    let space_id = space_id.into_inner();
    match server.send(SpaceInfoRequest { space_id }).await {
        Ok(result) => HttpResponse::Ok().json(result),
        Err(_) => HttpResponse::InternalServerError().finish(),
    }
}
