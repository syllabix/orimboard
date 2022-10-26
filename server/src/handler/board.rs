use actix_web::{
    body::BoxBody,
    http::{header::ContentType, StatusCode},
    web, Error, HttpRequest, HttpResponse, ResponseError,
};
use actix_web_actors::ws;
use derive_more::{Display, Error};
use serde::Deserialize;

use crate::{
    board::{self, space, user::User, Registry},
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

#[derive(Deserialize)]
pub struct Token {
    tk: u16,
}

async fn get_user(
    user_id: u16,
    user_client: web::Data<user::Client>,
) -> Result<user::Participant, Error> {
    match user_client.get(user_id).await {
        Ok(participant) => Ok(participant),
        Err(e) => {
            log::error!("failed to get user from user service: {}", e);
            Err(Error::from(ServerError::UserNotAuthorized))
        }
    }
}

fn get_space_id(req: &HttpRequest) -> Result<space::ID, Error> {
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
    token: web::Query<Token>,
    spaces: web::Data<board::Registry>,
    user_client: web::Data<user::Client>,
) -> Result<HttpResponse, Error> {
    let user = get_user(token.tk, user_client).await?;
    let space_id = get_space_id(&req)?;
    let space = spaces.get_or_create(space_id).await;

    ws::start(
        User::new(user.id.into(), user.name, user.color, space),
        &req,
        stream,
    )
}

pub async fn get_state(
    space_id: web::Path<space::ID>,
    registry: web::Data<Registry>,
) -> HttpResponse {
    let space_id = space_id.into_inner();
    match registry.get_space_info(space_id).await {
        Some(info) => HttpResponse::Ok().json(info),
        None => HttpResponse::NotFound().finish(),
    }
}
