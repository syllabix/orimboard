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
#[serde(rename_all = "camelCase")]
pub struct Chat {
    pub text: String,
    pub sent_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Point { 
    pub x: i64,
    pub y: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DrawInstruction {
    pub point: Point,
    pub color: String,
    // pub action: DrawAction,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum WidgetKind {
    Sticky,
    Rect,
    Circle,
    Star,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Widget {
    pub id: String,
    pub kind: WidgetKind,
    pub x: i64,
    pub y: i64,
    pub width: i64,
    pub height: i64,
    pub fill: String,
    pub stroke: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum Action {
    Chat { payload: Chat },
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
