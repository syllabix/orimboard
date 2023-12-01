use actix_web::http;

use super::payload::GameServer;

#[derive(Debug)]
pub struct Client{
    lock: tokio::sync::Mutex<reqwest::Client>
}

impl Client {
    pub fn new(_base_url: String) -> Client {
        Client {
            lock: tokio::sync::Mutex::new(reqwest::Client::new())
        }
    }

    #[tracing::instrument(name = "allocate", skip(self, _board_id))]
    pub async fn allocate(
        &self,
        _board_id: usize,
    ) -> Result<GameServer, Box<dyn std::error::Error>> {
        let http_client = self.lock.lock().await;
        http_client.get("https://www.google.com").send().await?;
        Ok(GameServer {
            game_server_name: String::from("local-orim-board-server"),
            port: 8080,
            address: String::from("127.0.0.1"),
        })
    }
}
