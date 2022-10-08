use std::collections::HashMap;
use std::time::SystemTime;

use actix::prelude::*;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
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
    pub id: String,
    pub point: Point,
    pub color: String,
    pub action: DrawAction,
}

#[derive(Debug, Clone, Serialize)]
pub struct DrawnLine {
    pub id: String,
    pub color: String,
    pub points: Vec<i64>,
    pub action: DrawAction,
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
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
    pub fill: String,
    pub stroke: String,
    pub draggable: bool,

    #[serde(default)]
    pub text: String,
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
    widgets: HashMap<String, Widget>,
    chat: Vec<Chat>,
    lines: HashMap<String, DrawnLine>,
}

impl Space {
    pub fn new(id: usize) -> Space {
        Space {
            _id: id,
            users: HashMap::new(),
            widgets: HashMap::new(),
            chat: vec![],
            lines: HashMap::new(),
        }
    }

    pub fn register(&mut self, user_id: usize, addr: Recipient<Update>) {
        self.users.insert(user_id, addr);
    }

    pub fn unregister(&mut self, user_id: usize) -> Option<Recipient<Update>> {
        self.users.remove(&user_id)
    }

    pub fn upsert(&mut self, action: Action) -> Action {
        match action {
            Action::Chat { payload } => {
                let msg = payload.clone();
                self.chat.push(msg);
                Action::Chat { payload }
            }
            Action::Draw { payload } => {
                let msg = payload.clone();
                let line = self.lines.entry(msg.id.clone()).or_insert(DrawnLine {
                    id: msg.id,
                    color: msg.color,
                    points: vec![],
                    action: msg.action,
                });
                line.points.push(msg.point.x);
                line.points.push(msg.point.y);
                Action::Draw { payload }
            }
            Action::Widget { payload } => {
                let id = payload.id.clone();
                self.widgets.insert(id.clone(), payload);
                Action::Widget {
                    payload: self.widgets.get(&id).unwrap().to_owned(),
                }
            }
        }
    }

    pub fn get_widgets(&self) -> Vec<Widget> {
        self.widgets.values().cloned().collect()
    }

    pub fn get_chat_history(&self) -> Vec<Chat> {
        self.chat.iter().cloned().collect()
    }

    pub fn get_drawings(&self) -> Vec<DrawnLine> {
        self.lines.values().cloned().collect()
    }
}
