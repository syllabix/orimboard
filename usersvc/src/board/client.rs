use std::collections::HashMap;

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub enum GameServerState {
    Ready = 0,
    Allocated = 1,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct GameServerSelector {
    match_labels: HashMap<String, String>,
    game_server_state: GameServerState,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct AllocateRequest {
    namespace: String,
    match_labels: Vec<GameServerSelector>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AllocateResponse {
    #[serde(rename = "gameServerName")]
    pub game_server_name: String,
    pub ports: Vec<Port>,
    pub address: String,

    #[serde(rename = "nodeName")]
    pub node_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Port {
    pub name: String,
    pub port: i64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GameServer {
    #[serde(rename = "gameServerName")]
    pub game_server_name: String,
    pub port: i64,
    pub address: String,
}

impl From<AllocateResponse> for GameServer {
    fn from(res: AllocateResponse) -> Self {
        let port = res
            .ports
            .iter()
            .find(|p| p.name == "default")
            .map_or_else(|| 0, |p| p.port);

        GameServer {
            game_server_name: res.game_server_name,
            port,
            address: res.address,
        }
    }
}

#[derive(Debug, Clone)]
pub struct Client {
    http: reqwest::Client,
}

impl Client {
    pub fn new() -> Client {
        Client {
            http: reqwest::Client::new(),
        }
    }

    pub async fn allocate(
        &self,
        board_id: usize,
    ) -> Result<GameServer, Box<dyn std::error::Error>> {
        let url = "http://agones-allocator.agones-sys.svc.cluster.local/gameserverallocation";
        let mut board_id_label = HashMap::new();
        board_id_label.insert(
            format!("agones.dev/sdk-{}", board_id),
            String::from("space-id"),
        );
        let req_body = AllocateRequest {
            namespace: String::from("board"),
            match_labels: vec![
                GameServerSelector {
                    game_server_state: GameServerState::Allocated,
                    match_labels: board_id_label,
                },
                GameServerSelector {
                    game_server_state: GameServerState::Ready,
                    match_labels: HashMap::new(),
                },
            ],
        };
        let result: AllocateResponse = self
            .http
            .post(url)
            .json(&req_body)
            .send()
            .await?
            .json()
            .await?;

        Ok(result.into())
    }
}
