mod board;
mod handler;
mod user;

use actix_cors::Cors;

use actix_web::middleware::Logger;
use actix_web::{web, App, HttpServer};

use crate::board::Registry;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    std::env::set_var("RUST_BACKTRACE", "1");
    env_logger::init();

    let host = std::env::var("HOST").unwrap_or("127.0.0.1".to_string());
    let port = std::env::var("PORT")
        .map(|ps| ps.parse::<u16>().expect("Invalid PORT specified"))
        .unwrap_or(8080);
    log::info!("Starting board server at {}:{}...", &host, &port);

    let user_registry = web::Data::new(user::Registry::new());
    let board_server = web::Data::new(Registry::new());

    let server = HttpServer::new(move || {
        let logger = Logger::default();

        App::new()
            .wrap(cors_config())
            .wrap(logger)
            .route("/healthz", web::get().to(handler::health_check))
            .service(
                web::scope("/v1/user")
                    .app_data(user_registry.clone())
                    .route("", web::put().to(handler::user::create))
                    .route("", web::get().to(handler::user::get_all))
                    .route("/{id}", web::get().to(handler::user::get)),
            )
            .service(
                web::scope("/v1/board")
                    .app_data(board_server.clone())
                    .app_data(user_registry.clone())
                    .route("/{id}/connect", web::get().to(handler::board::connect))
                    .route("/{id}", web::get().to(handler::board::get_state)),
            )
    })
    .bind((host, port))?
    .run();
    
    let _ = tokio::join!(server, agones_init());

    Ok(())
}

#[cfg(feature = "agones_sdk")]
async fn agones_init() -> std::io::Result<()> {
    use std::time::Duration;

    log::info!("Connecting to Agones SDK sidecar...");
    let mut sdk = agones::Sdk::new(None /* default port */, None /* keep_alive */)
    .await
    .expect("failed to connect to SDK server");

    // Spawn a task that will send health checks every 2 seconds. If this current
    // thread/task panics or dropped, the health check will also be stopped
    let _health = {
        let health_tx = sdk.health_check();
        let (tx, mut rx) = tokio::sync::oneshot::channel::<()>();

        tokio::task::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(2));

            loop {
                tokio::select! {
                    _ = interval.tick() => {
                        log::info!("Sending health check heartbeat...");
                        if health_tx
                            .send(())
                            .await.is_err() {
                                log::error!("Health check receiver was dropped");
                                break;
                        }
                    }
                    _ = &mut rx => {
                        log::info!("Health check task canceled");
                        break;
                    }
                }
            }
        });

        tx
    };

    let _watch = {
        let mut watch_client = sdk.clone();
        let (tx, mut rx) = tokio::sync::oneshot::channel::<()>();

        tokio::task::spawn(async move {
            println!("Starting to watch GameServer updates...");
            match watch_client.watch_gameserver().await {
                Err(e) => log::warn!("Failed to watch for GameServer updates: {}", e),
                Ok(mut stream) => loop {
                    tokio::select! {
                        gs = stream.message() => {
                            match gs {
                                Ok(Some(gs)) => {
                                    log::info!("GameServer Update, name: {}", gs.object_meta.unwrap().name);
                                    log::info!("GameServer Update, state: {}", gs.status.unwrap().state);
                                }
                                Ok(None) => {
                                    log::info!("Server closed the GameServer watch stream");
                                    break;
                                }
                                Err(e) => {
                                    log::warn!("GameServer Update stream encountered an error: {}", e);
                                }
                            }

                        }
                        _ = &mut rx => {
                            log::info!("Shutting down GameServer watch loop");
                            break;
                        }
                    }
                },
            }
        });

        tx
    };

    sdk.ready()
    .await
    .expect("Can't mark game session as ready");

    Ok(())
}

#[cfg(not(feature = "agones_sdk"))]
async fn agones_init() -> std::io::Result<()> {
    log::info!("Local run; Agones not enabled!");
    Ok(())
}

fn cors_config() -> Cors {
    let cors_allow_origin =
        std::env::var("CORS_ALLOW_ORIGIN").unwrap_or("http://localhost:3000".to_string());

    Cors::default()
        .allowed_origin(cors_allow_origin.as_str())
        .allowed_methods(vec!["GET", "PUT"])
        .allow_any_header()
        .supports_credentials()
        .max_age(3600)
}
