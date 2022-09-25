use std::collections::HashMap;
use std::time::SystemTime;

use actix::prelude::*;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum DrawAction {
    Start,
    Stroke,
    Finish,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub struct ChatMessage {
    pub user_id: usize,
    pub text: String,
    pub sent_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum Content {
    Chat {
        payload: ChatMessage,
    },
    DrawInstruction {
        x: i64,
        y: i64,
        color: String,
        action: DrawAction,
    },
}

#[derive(Message, Serialize, Clone)]
#[rtype(result = "()")]
pub struct Update {
    pub user_id: usize,
    pub space_id: usize,
    pub user_name: String,
    pub content: Content,
    pub created_at: SystemTime,
}

#[derive(Debug, Clone)]
pub struct Space {
    _id: usize,
    pub users: HashMap<usize, Recipient<Update>>,
}

impl Space {
    pub fn new(id: usize) -> Space {
        Space {
            _id: id,
            users: HashMap::new(),
        }
    }

    pub fn register(&mut self, user_id: usize, addr: Recipient<Update>) {
        self.users.insert(user_id, addr);
    }

    pub fn unregister(&mut self, user_id: usize) -> Option<Recipient<Update>> {
        self.users.remove(&user_id)
    }
}
