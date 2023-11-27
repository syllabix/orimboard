use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use super::payload::GameServer;

#[derive(Serialize, Deserialize, Debug)]
pub enum GameServerState {
    Ready = 0,
    Allocated = 1,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct GameServerSelector {
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(default)]
    match_labels: Option<HashMap<String, String>>,
    game_server_state: i8,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct MetaPatch {
    labels: HashMap<String, String>,
}

#[derive(Serialize, Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct AllocateRequest {
    namespace: String,
    game_server_selectors: Vec<GameServerSelector>,
    metadata: MetaPatch,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AllocateResponse {
    pub game_server_name: String,
    pub ports: Vec<Port>,
    pub address: String,
    pub node_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Port {
    pub name: String,
    pub port: i64,
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
    url: String,
    http: reqwest::Client,
}

impl Client {
    pub fn new(base_url: String) -> Client {
        Client {
            url: format!("{}/gameserverallocation", base_url),
            http: reqwest::Client::new(),
        }
    }

    #[tracing::instrument(name = "allocate", skip(self, board_id))]
    pub async fn allocate(
        &self,
        board_id: usize,
    ) -> Result<GameServer, Box<dyn std::error::Error>> {
        let mut board_id_label = HashMap::new();
        board_id_label.insert(
            format!("agones.dev/sdk-gs-{}", board_id),
            String::from("space-id"),
        );
        let req_body = AllocateRequest {
            namespace: String::from("board"),
            metadata: MetaPatch {
                labels: board_id_label.clone(),
            },
            game_server_selectors: vec![
                GameServerSelector {
                    game_server_state: 1,
                    match_labels: Some(board_id_label),
                },
                GameServerSelector {
                    game_server_state: 0,
                    match_labels: None,
                },
            ],
        };
        let result: AllocateResponse = self
            .http
            .post(&self.url)
            .json(&req_body)
            .send()
            .await?
            .json()
            .await?;

        Ok(result.into())
    }
}
