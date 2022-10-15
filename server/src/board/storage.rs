use std::collections::HashMap;

use super::{
    component::{ChatMessage, DrawnLine, UserProfile, Widget},
    message::{Action, SpaceInfo},
    space, user,
};

#[derive(Debug, Clone)]
pub struct Service {
    id: space::ID,
    chat: Vec<ChatMessage>,
    lines: HashMap<String, DrawnLine>,
    users: HashMap<user::ID, UserProfile>,
    widgets: HashMap<String, Widget>,
}

impl Service {
    pub fn new(id: space::ID) -> Service {
        Service {
            id,
            chat: Default::default(),
            lines: Default::default(),
            users: Default::default(),
            widgets: Default::default(),
        }
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
            Action::Join { payload } => {
                self.users.insert(payload.id, payload.clone());
                Action::Join { payload }
            }
            Action::Leave { payload: _ } => action,
        }
    }

    pub fn get(&self) -> SpaceInfo {
        SpaceInfo {
            space_id: self.id,
            widgets: self.widgets(),
            chat: self.chat_history(),
            lines: self.drawings(),
            users: self.users(),
        }
    }

    fn widgets(&self) -> Vec<Widget> {
        self.widgets.values().cloned().collect()
    }

    fn chat_history(&self) -> Vec<ChatMessage> {
        self.chat.iter().cloned().collect()
    }

    fn drawings(&self) -> Vec<DrawnLine> {
        self.lines.values().cloned().collect()
    }

    fn users(&self) -> Vec<UserProfile> {
        self.users.values().cloned().collect()
    }
}
