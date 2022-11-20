use std::collections::HashMap;

use crate::board::{space, component::{ChatMessage, DrawnLine, UserProfile, Widget}, user, message::{Action, SpaceInfo}};

use super::backend::Backend;


#[derive(Debug, Clone)]
pub struct Service {
    id: space::ID,
    chat: Vec<ChatMessage>,
    lines: HashMap<String, DrawnLine>,
    users: HashMap<user::ID, UserProfile>,
    widgets: HashMap<String, Widget>,
    backend: Backend,
}

impl Service {
    pub fn new(id: space::ID) -> Service {
        Service {
            id,
            chat: Default::default(),
            lines: Default::default(),
            users: Default::default(),
            widgets: Default::default(),
            backend: Backend::new(),
        }
    }

    pub fn upsert(&mut self, user_id: user::ID, action: Action) -> Action {
        match action {
            Action::Chat { mut payload } => {
                payload.user = self.users.get(&user_id).cloned();
                let msg = payload.clone();
                self.chat.push(msg);
                Action::Chat { payload }
            }
            Action::Draw { mut payload } => {
                payload.user_id = user_id;
                let msg = payload.clone();
                let line = self.lines.entry(msg.id.clone()).or_insert(DrawnLine {
                    id: msg.id,
                    color: msg.color,
                    points: vec![],
                    action: msg.action,
                    user_id,
                });
                line.points.push(msg.point.x);
                line.points.push(msg.point.y);
                Action::Draw { payload }
            }
            Action::Widget { mut payload } => {
                payload.user_id = user_id;
                let id = payload.id.clone();
                self.widgets.insert(id.clone(), payload);
                let widget = self.widgets.get(&id).unwrap().to_owned();
                self.save(serde_json::to_vec(&widget).unwrap().as_ref());
                Action::Widget {
                    payload: widget,
                }
            }
            Action::Join { payload } => {
                self.users.insert(payload.id, payload.clone());
                Action::Join { payload }
            }
            Action::Leave { payload } => {
                self.users.remove(&payload);
                Action::Leave { payload }
            }
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
        self.chat.to_vec()
    }

    fn drawings(&self) -> Vec<DrawnLine> {
        self.lines.values().cloned().collect()
    }

    fn users(&self) -> Vec<UserProfile> {
        self.users.values().cloned().collect()
    }

    fn save(&self, data: &[u8]) {
        if let Err(e) = self.backend.upsert(self.id, data) {
            log::error!("failed to save message: {:?}", e)
        };
    }
}
