use actix_web::HttpResponse;
use serde::Serialize;
use std::time::SystemTime;

#[derive(Serialize)]
pub struct Response {
    pub status: String,
    pub version: String,

    #[serde(with = "serde_millis")]
    pub timestamp: std::time::SystemTime,
}

pub async fn health_check() -> HttpResponse {
    HttpResponse::Ok().json(Response {
        status: String::from("Ok"),
        version: env!("CARGO_PKG_VERSION").to_string(),
        timestamp: SystemTime::now(),
    })
}
