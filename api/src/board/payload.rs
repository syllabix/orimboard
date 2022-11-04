use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct GameServer {
    #[serde(rename = "gameServerName")]
    pub game_server_name: String,
    pub port: i64,
    pub address: String,
}
