mod board;
mod handler;
mod service;

use actix::Actor;
use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let user_service = service::user::Service::new();
    let board_server = board::server::BoardServer::new().start();

    HttpServer::new(move || {
        let logger = Logger::default();

        App::new()
            .wrap(logger)
            .route("/healthz", web::get().to(handler::health_check))
            .service(
                web::scope("/user")
                    .app_data(web::Data::new(user_service.clone()))
                    .route("", web::post().to(handler::user::create))
                    .route("", web::get().to(handler::user::get_all))
                    .route("/{id}", web::get().to(handler::user::get)),
            )
            .service(
                web::scope("/board")
                    .app_data(web::Data::new(board_server.clone()))
                    .route("/{id}/start", web::get().to(board::server::start_up)),
            )
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
