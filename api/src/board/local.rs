use super::payload::GameServer;


#[derive(Debug, Clone)]
pub struct Client();

impl Client {
    pub fn new(base_url: String) -> Client {
        Client {}
    }

    pub async fn allocate(
        &self,
        _board_id: usize,
    ) -> Result<GameServer, Box<dyn std::error::Error>> {
        Ok(GameServer {
            game_server_name: String::from("local-orim-board-server"),
            port: 8080,
            address: String::from("http://127.0.0.1"),
        })
    }
}