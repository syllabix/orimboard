use std::collections::HashMap;

use crate::board::{
    component::{ChatMessage, DrawnLine, UserProfile, Widget},
    message::{Action, SpaceInfo},
    space, user,
};

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
                payload.space_id = self.id;
                let msg = payload.clone();
                self.save_chat(&msg);
                self.chat.push(msg);
                Action::Chat { payload }
            }
            Action::Draw { mut payload } => {
                payload.user_id = user_id;
                let msg = payload.clone();
                let line = self.lines.entry(msg.id.clone()).or_insert(DrawnLine {
                    id: msg.id,
                    space_id: self.id,
                    color: msg.color,
                    points: vec![],
                    action: msg.action,
                    user_id,
                });
                line.points.push(msg.point.x);
                line.points.push(msg.point.y);
                if let Err(e) = self.backend.upsert_drawn_line(line) {
                    log::error!("failed to save drawn line message: {:?}", e)
                };
                Action::Draw { payload }
            }
            Action::Widget { mut payload } => {
                payload.user_id = user_id;
                payload.space_id = self.id;
                let id = payload.id.clone();
                self.widgets.insert(id.clone(), payload);
                let widget = self.widgets.get(&id).unwrap().to_owned();
                self.save_widget(&widget);
                Action::Widget { payload: widget }
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

    fn save_widget(&self, widget: &Widget) {
        if let Err(e) = self.backend.upsert_widget(widget) {
            log::error!("failed to save widget: {:?}", e)
        };
    }

    fn save_chat(&self, chat: &ChatMessage) {
        if let Err(e) = self.backend.upsert_chat(&chat) {
            log::error!("failed to save chat message: {:?}", e)
        };
    }
}
