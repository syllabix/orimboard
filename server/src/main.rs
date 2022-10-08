mod board;
mod handler;
mod service;

use actix::Actor;
use actix_cors::Cors;

use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let board_server = board::server::BoardServer::new();
    let board_server_addr = web::Data::new(board_server.start());

    HttpServer::new(move || {
        let logger = Logger::default();

        App::new()
            .wrap(
                Cors::default()
                    .allowed_origin("http://localhost:3000")
                    .allowed_methods(vec!["GET", "POST"])
                    .allow_any_header()
                    .supports_credentials()
                    .max_age(3600),
            )
            .wrap(logger)
            .route("/healthz", web::get().to(handler::health_check))
            .service(
                web::scope("/v1/board")
                    .app_data(board_server_addr.clone())
                    .route("/{id}/connect", web::get().to(board::server::connect))
                    .route("/{id}/widgets", web::get().to(board::server::get_widgets)),
            )
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
