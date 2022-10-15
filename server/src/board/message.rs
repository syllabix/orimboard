use actix::{Message, MessageResponse, Recipient};

use serde::{Deserialize, Serialize};
use std::time::SystemTime;

use super::{
    component::{ChatMessage, DrawInstruction, DrawnLine, UserProfile, Widget},
    space, user,
};

#[derive(Message)]
#[rtype(result = "()")]
pub struct Connect {
    pub user: UserProfile,
    pub addr: Recipient<Update>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub user_id: user::ID,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum Action {
    Chat { payload: ChatMessage },
    Draw { payload: DrawInstruction },
    Widget { payload: Widget },
    Join { payload: UserProfile },
    Leave { payload: user::ID },
}

#[derive(Message, Serialize, Clone, Debug)]
#[rtype(result = "()")]
pub struct Update {
    pub user_id: usize,
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
    pub lines: Vec<DrawnLine>,
    pub users: Vec<UserProfile>,
}

#[derive(Message)]
#[rtype(result = "SpaceInfo")]
pub struct SpaceInfoRequest {
    pub space_id: space::ID,
}
