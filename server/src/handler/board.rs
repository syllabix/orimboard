

use actix::Addr;
use actix_web::{
    body::BoxBody,
    http::{header::ContentType, StatusCode},
    web, Error, HttpRequest, HttpResponse, Responder, ResponseError,
};
use actix_web_actors::ws;
use derive_more::{Display, Error};

use crate::{
    board::{
        server::{BoardServer, SpaceInfoRequest},
        user::User,
    },
    user,
};

#[derive(Debug, Display, Error)]
pub enum ServerError {
    #[display(fmt = "You are not authorized to access this board")]
    UserNotAuthorized,

    #[display(fmt = "The board id is invalid")]
    InvalidBoardId,
}

impl ResponseError for ServerError {
    fn status_code(&self) -> StatusCode {
        match self {
            ServerError::UserNotAuthorized => StatusCode::UNAUTHORIZED,
            ServerError::InvalidBoardId => StatusCode::BAD_REQUEST,
        }
    }

    fn error_response(&self) -> HttpResponse<BoxBody> {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(self.to_string())
    }
}

fn get_user(
    req: &HttpRequest,
    user_svc: web::Data<user::Registry>,
) -> Result<user::Participant, Error> {
    let user_id: u16 = match req.cookie("token") {
        Some(cookie) => match cookie.value().trim().parse() {
            Ok(user_id) => user_id,
            Err(e) => {
                log::error!("{}", e);
                return Err(Error::from(ServerError::UserNotAuthorized));
            }
        },
        None => return Err(Error::from(ServerError::UserNotAuthorized)),
    };

    match user_svc.get(user_id) {
        Some(user) => Ok(user),
        None => Err(Error::from(ServerError::UserNotAuthorized)),
    }
}

fn get_space_id(req: &HttpRequest) -> Result<usize, Error> {
    let space_id: &str = match req.match_info().get("id") {
        Some(id) => id,
        None => return Err(Error::from(ServerError::InvalidBoardId)),
    };

    match space_id.trim().parse() {
        Ok(id) => Ok(id),
        Err(_) => Err(Error::from(ServerError::InvalidBoardId)),
    }
}

pub async fn connect(
    req: HttpRequest,
    stream: web::Payload,
    server: web::Data<Addr<BoardServer>>,
    user_svc: web::Data<user::Registry>,
) -> Result<HttpResponse, Error> {
    let user = get_user(&req, user_svc)?;
    let space_id = get_space_id(&req)?;

    ws::start(
        User {
            user_id: user.id.into(),
            space_id,
            name: user.name,
            color: user.color,
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
