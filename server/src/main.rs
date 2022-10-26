mod board;
mod gameserver;
mod handler;
mod user;

use std::io::{Error, ErrorKind};

use actix_cors::Cors;

use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};

use crate::board::Registry;
use crate::gameserver::BoardEvent;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_BACKTRACE", "1");

    let log_level = std::env::var("RUST_LOG").unwrap_or_else(|_| "debug".to_string());
    std::env::set_var("RUST_LOG", log_level);

    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = std::env::var("PORT")
        .map(|ps| ps.parse::<u16>().expect("Invalid PORT specified"))
        .unwrap_or(8080);

    env_logger::init();

    let manager = gameserver::Manager::setup().await.map_err(|e| {
        Error::new(
            ErrorKind::Other,
            format!("failed to set up game server manager {}", e),
        )
    })?;

    log::info!("starting board server at {}:{}...", &host, &port);
    let user_client = web::Data::new(user::Client::new());
    let board_server = web::Data::new(Registry::new(manager.board_events()));

    manager
        .board_events()
        .send(BoardEvent::Ready)
        .await
        .unwrap();

    HttpServer::new(move || {
        let logger = Logger::default();

        App::new()
            .wrap(cors_config())
            .wrap(logger)
            .route("/healthz", web::get().to(handler::health_check))
            .service(
                web::scope("/v1/board")
                    .app_data(board_server.clone())
                    .app_data(user_client.clone())
                    .route("/{id}/connect", web::get().to(handler::board::connect))
                    .route("/{id}", web::get().to(handler::board::get_state)),
            )
    })
    .bind((host, port))?
    .run()
    .await
    .map_err(|e| Error::new(ErrorKind::Other, e))?;

    manager
        .board_events()
        .send(BoardEvent::Shutdown)
        .await
        .unwrap();

    Ok(())
}

fn cors_config() -> Cors {
    let cors_allow_origin =
        std::env::var("CORS_ALLOW_ORIGIN").unwrap_or_else(|_| "http://localhost:3000".to_string());

    Cors::default()
        .allowed_origin(cors_allow_origin.as_str())
        .allowed_methods(vec!["GET", "PUT"])
        .allow_any_header()
        .supports_credentials()
        .max_age(3600)
}
