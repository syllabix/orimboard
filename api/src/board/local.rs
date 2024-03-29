use super::payload::GameServer;

#[derive(Debug, Clone)]
pub struct Client();

impl Client {
    pub fn new(_base_url: String) -> Client {
        Client {}
    }

    #[tracing::instrument(name = "allocate", skip(self, _board_id))]
    pub async fn allocate(
        &self,
        _board_id: usize,
    ) -> Result<GameServer, Box<dyn std::error::Error>> {
        Ok(GameServer {
            game_server_name: String::from("local-orim-board-server"),
            port: 8080,
            address: String::from("127.0.0.1"),
        })
    }
}
