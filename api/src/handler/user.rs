use actix_web::{web, HttpResponse};
use serde::Deserialize;

use crate::user;

#[derive(Deserialize)]
pub struct CreateUserRequest {
    pub name: String,
}

#[tracing::instrument(name = "create_user", skip(svc, user))]
pub async fn create(
    user: web::Json<CreateUserRequest>,
    svc: web::Data<user::Registry>,
) -> HttpResponse {
    let user = svc.create(user.name.as_str());
    HttpResponse::Created().json(user)
}

#[tracing::instrument(name = "get_user", skip(svc))]
pub async fn get(path: web::Path<u16>, svc: web::Data<user::Registry>) -> HttpResponse {
    let user_id = path.into_inner();
    match svc.get(user_id) {
        Some(user) => HttpResponse::Ok().json(user),
        None => HttpResponse::NotFound().finish(),
    }
}

#[tracing::instrument(name = "get_all_users", skip(svc))]
pub async fn get_all(svc: web::Data<user::Registry>) -> HttpResponse {
    HttpResponse::Ok().json(svc.get_all())
}
