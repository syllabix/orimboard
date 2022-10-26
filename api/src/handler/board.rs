use actix_web::{web, HttpResponse};

use crate::board;

pub async fn allocate(path: web::Path<usize>, client: web::Data<board::Client>) -> HttpResponse {
    let board_id = path.into_inner();
    match client.allocate(board_id).await {
        Ok(game_server) => HttpResponse::Created().json(game_server),
        Err(e) => {
            log::error!("failed to allocate board: {}", e);
            HttpResponse::BadRequest().finish()
        }
    }
}
