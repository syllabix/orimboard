use actix::{Actor, Addr, Context, Handler, Message, Recipient};
use actix_web::{http::{StatusCode, header::ContentType}, web, HttpRequest, HttpResponse, ResponseError, body::BoxBody, Error, Responder};
use actix_web_actors::ws;
use rand::Rng;
use std::collections::HashMap;
use derive_more::{Display, Error};

use super::{
    space::{Space, Update, Action, Widget},
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

    pub fn get_board(&self, id: usize) -> Option<Vec<&Widget>> {
        match self.spaces.get(&id) {
            None => None,
            Some(space) => Some(space.widgets.values().collect()),
        }
    }
}

impl Actor for BoardServer {
    type Context = Context<Self>;
}

impl Handler<Connect> for BoardServer {
    type Result = ();

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        println!(
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
        println!(
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
        // println!("board update {:?}", msg);
        if let Some(space) = self.spaces.get_mut(&msg.space_id) {

            // if update should be "persisted" let's upsert it
            // into the space
            if let Action::Widget { payload } = msg.action {
                let res = space.upsert(payload);
                msg.action = Action::Widget { payload: res.to_owned() }
            }

            for (user_id, user) in space.users.iter() {
                if msg.user_id != *user_id {
                    user.do_send(msg.clone())
                }
            }
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

pub async fn start_up(
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
