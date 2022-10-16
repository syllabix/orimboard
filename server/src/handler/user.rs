use actix_web::{web, HttpResponse};
use actix_session:: Session;
use serde::Deserialize;
use crate::user;

#[derive(Deserialize)]
pub struct CreateUserRequest {
    pub name: String,
}

pub async fn create(
    user: web::Json<CreateUserRequest>,
    svc: web::Data<user::Registry>,
    session: Session
) -> HttpResponse {
    let user = svc.create(user.name.as_str());

    session.insert("token", user.id.to_string());
    println!("Inserted token for user id: {}", user.id);
    HttpResponse::Created().json(user)
}

pub async fn get(path: web::Path<u16>, svc: web::Data<user::Registry>) -> HttpResponse {
    let result = svc.get(path.into_inner());
    match result {
        Some(user) => HttpResponse::Ok().json(user),
        None => HttpResponse::NotFound().finish(),
    }
}

pub async fn get_all(svc: web::Data<user::Registry>) -> HttpResponse {
    HttpResponse::Ok().json(svc.get_all())
}
