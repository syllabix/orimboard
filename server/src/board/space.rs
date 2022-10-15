use std::{collections::HashMap, time::SystemTime};

use actix::{Actor, Context, Handler, Recipient};

use super::{
    component::{ChatMessage, DrawnLine, Widget},
    message::{Action, Connect, Disconnect, SpaceInfo, SpaceInfoRequest, Update},
    storage,
};

pub type ID = usize;

#[derive(Debug, Clone)]
pub struct Space {
    id: ID,
    users: HashMap<usize, Recipient<Update>>,
    storage: storage::Service,
}

impl Space {
    pub fn new(id: ID) -> Space {
        Space {
            id,
            users: HashMap::new(),
            storage: storage::Service::new(id),
        }
    }

    fn broadcast(&self, msg: Update) {
        for (user_id, user) in self.users.iter() {
            if msg.user_id != *user_id {
                user.do_send(msg.clone())
            }
        }
    }

    fn register(&mut self, user_id: usize, addr: Recipient<Update>) {
        self.users.insert(user_id, addr);
    }

    fn unregister(&mut self, user_id: usize) -> Option<Recipient<Update>> {
        self.users.remove(&user_id)
    }

    fn upsert(&mut self, action: Action) -> Action {
        self.storage.upsert(action)
    }
}

impl Actor for Space {
    type Context = Context<Self>;
}

impl Handler<Connect> for Space {
    type Result = ();

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        log::debug!("user {} connecting to space {}", &msg.user.id, &self.id);
        self.register(msg.user.id, msg.addr);
        self.broadcast(Update {
            user_id: msg.user.id,
            action: Action::Join { payload: msg.user },
            created_at: SystemTime::now(),
        })
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
        self.broadcast(Update {
            user_id: msg.user_id,
            action: Action::Leave {
                payload: msg.user_id,
            },
            created_at: SystemTime::now(),
        })
    }
}

impl Handler<Update> for Space {
    type Result = ();

    fn handle(&mut self, mut msg: Update, _ctx: &mut Self::Context) -> Self::Result {
        msg.action = self.upsert(msg.action);
        self.broadcast(msg);
    }
}

impl Handler<SpaceInfoRequest> for Space {
    type Result = SpaceInfo;

    fn handle(&mut self, _msg: SpaceInfoRequest, _ctx: &mut Self::Context) -> Self::Result {
        self.storage.get()
    }
}
