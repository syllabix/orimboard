use actix_web::body::BoxBody;
use actix_web::{error, http::header::ContentType, http::StatusCode, HttpResponse};

use derive_more::{Display, Error};
use error::ResponseError;


use serde::{Deserialize, Serialize};

use crate::service::datastore::user;

use std::time::SystemTime;

use super::datastore;

#[derive(Debug, Display, Error)]
pub enum Error {
    #[display(fmt = "The user you have requested does not exist")]
    NotFound,

    #[display(fmt = "The email that you are trying to register an account with is already in use")]
    UsernameTaken,

    #[display(fmt = "An unexpected error occurred. Sorry...")]
    SystemFailure,
}

impl ResponseError for Error {
    fn status_code(&self) -> StatusCode {
        match self {
            Error::NotFound => StatusCode::NOT_FOUND,
            Error::UsernameTaken => StatusCode::CONFLICT,
            Error::SystemFailure => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse<BoxBody> {
        HttpResponse::build(self.status_code())
            .insert_header(ContentType::json())
            .body(self.to_string())
    }
}

#[derive(Serialize, Deserialize)]
pub struct CreateRequest {
    pub name: String,
    pub email: String,
}

impl Into<datastore::user::Model> for CreateRequest {
    fn into(self) -> datastore::user::Model {
        let now = SystemTime::now();
        datastore::user::Model {
            id: 0,
            name: self.name,
            email: self.email,
            created_at: now,
            updated_at: now,
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct User {
    pub id: u32,
    pub name: String,
    pub email: String,

    #[serde(with = "serde_millis")]
    pub created_at: SystemTime,

    #[serde(with = "serde_millis")]
    pub updated_at: SystemTime,
}

impl From<datastore::user::Model> for User {
    fn from(model: datastore::user::Model) -> Self {
        User {
            id: model.id,
            name: model.name,
            email: model.email,
            created_at: model.created_at,
            updated_at: model.updated_at,
        }
    }
}

#[derive(Clone)]
pub struct Service {
    store: user::Database,
}

impl Service {
    pub fn new() -> Service {
        Service {
            store: user::Database::new(),
        }
    }

    pub async fn create(&self, user: CreateRequest) -> Result<User, Error> {
        match self.store.create(user.into()).await {
            Ok(data) => Ok(User::from(data)),
            Err(err) => Err(match err {
                user::Error::NotFound => Error::NotFound,
                user::Error::EmailInUse => Error::UsernameTaken,
                user::Error::SystemFailure => Error::SystemFailure,
            }),
        }
    }

    pub async fn get(&self, id: u32) -> Result<User, Error> {
        match self.store.get(id).await {
            Ok(data) => Ok(User::from(data)),
            Err(err) => Err(match err {
                user::Error::NotFound => Error::NotFound,
                user::Error::EmailInUse => Error::UsernameTaken,
                user::Error::SystemFailure => Error::SystemFailure,
            }),
        }
    }

    pub async fn get_all(&self) -> Result<Vec<User>, Error> {
        match self.store.get_all().await {
            Ok(result) => Ok(result.into_iter().map(User::from).collect()),
            Err(err) => Err(match err {
                user::Error::NotFound => Error::NotFound,
                user::Error::EmailInUse => Error::UsernameTaken,
                user::Error::SystemFailure => Error::SystemFailure,
            }),
        }
    }
}
