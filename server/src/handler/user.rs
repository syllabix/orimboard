use crate::service::user;

use actix_web::{web, HttpResponse, Responder};

pub async fn create(
    user: web::Json<user::CreateRequest>,
    svc: web::Data<user::Service>,
) -> impl Responder {
    return match svc.create(user.0).await {
        Ok(user) => HttpResponse::Created().json(user),
        Err(e) => HttpResponse::from_error(e),
    };
}

pub async fn get(path: web::Path<u32>, svc: web::Data<user::Service>) -> HttpResponse {
    match svc.get(path.into_inner()).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(e) => HttpResponse::from_error(e),
    }
}

pub async fn get_all(svc: web::Data<user::Service>) -> HttpResponse {
    match svc.get_all().await {
        Ok(users) => HttpResponse::Ok().json(users),
        Err(e) => HttpResponse::from_error(e),
    }
}
