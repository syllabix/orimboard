use std::collections::HashMap;

use actix::{Actor, Context, Handler, Recipient};

use super::{
    component::{ChatMessage, DrawnLine, Widget},
    message::{Action, Connect, Disconnect, SpaceInfo, SpaceInfoRequest, Update},
};

pub type ID = usize;

#[derive(Debug, Clone)]
pub struct Space {
    id: ID,
    pub users: HashMap<usize, Recipient<Update>>,
    widgets: HashMap<String, Widget>,
    chat: Vec<ChatMessage>,
    lines: HashMap<String, DrawnLine>,
}

impl Space {
    pub fn new(id: usize) -> Space {
        Space {
            id: id,
            users: HashMap::new(),
            widgets: HashMap::new(),
            chat: vec![],
            lines: HashMap::new(),
        }
    }

    fn register(&mut self, user_id: usize, addr: Recipient<Update>) {
        self.users.insert(user_id, addr);
    }

    fn unregister(&mut self, user_id: usize) -> Option<Recipient<Update>> {
        self.users.remove(&user_id)
    }

    fn upsert(&mut self, action: Action) -> Action {
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

    fn get_widgets(&self) -> Vec<Widget> {
        self.widgets.values().cloned().collect()
    }

    fn get_chat_history(&self) -> Vec<ChatMessage> {
        self.chat.iter().cloned().collect()
    }

    fn get_drawings(&self) -> Vec<DrawnLine> {
        self.lines.values().cloned().collect()
    }
}

impl Actor for Space {
    type Context = Context<Self>;
}

impl Handler<Connect> for Space {
    type Result = ();

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        log::debug!("user {} connecting to space {}", &msg.user_id, &self.id);
        self.register(msg.user_id, msg.addr);
    }
}

impl Handler<Disconnect> for Space {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _ctx: &mut Self::Context) -> Self::Result {
        log::debug!(
            "user {} disconnecting from space {}",
            &msg.user_id,
            &self.id
        );
        self.unregister(msg.user_id);
    }
}

impl Handler<Update> for Space {
    type Result = ();

    fn handle(&mut self, mut msg: Update, _ctx: &mut Self::Context) -> Self::Result {
        let action = self.upsert(msg.action);
        msg.action = action;
        for (user_id, user) in self.users.iter() {
            if msg.user_id != *user_id {
                user.do_send(msg.clone())
            }
        }
    }
}

impl Handler<SpaceInfoRequest> for Space {
    type Result = SpaceInfo;

    fn handle(&mut self, msg: SpaceInfoRequest, _ctx: &mut Self::Context) -> Self::Result {
        SpaceInfo {
            space_id: msg.space_id,
            widgets: self.get_widgets(),
            chat: self.get_chat_history(),
            line: self.get_drawings(),
        }
    }
}
