use actix::{Message, MessageResponse, Recipient};

use serde::{Deserialize, Serialize};
use std::time::SystemTime;

use super::component::{ChatMessage, DrawInstruction, DrawnLine, Widget};

#[derive(Message)]
#[rtype(result = "()")]
pub struct Connect {
    pub user_id: usize,
    pub space_id: usize,
    pub addr: Recipient<Update>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub user_id: usize,
    pub space_id: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum Action {
    Chat { payload: ChatMessage },
    Draw { payload: DrawInstruction },
    Widget { payload: Widget },
}

#[derive(Message, Serialize, Clone, Debug)]
#[rtype(result = "()")]
pub struct Update {
    pub user_id: usize,
    pub space_id: usize,
    pub user_name: String,
    pub action: Action,

    #[serde(with = "serde_millis")]
    pub created_at: SystemTime,
}

#[derive(MessageResponse, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SpaceInfo {
    pub space_id: usize,
    pub widgets: Vec<Widget>,
    pub chat: Vec<ChatMessage>,
    pub line: Vec<DrawnLine>,
}

#[derive(Message)]
#[rtype(result = "SpaceInfo")]
pub struct SpaceInfoRequest {
    pub space_id: usize,
}
