use std::{collections::HashMap, time::SystemTime};

use actix::{Actor, Context, Handler, Recipient};

use super::{
    component::UserProfile,
    message::{Action, Connect, Disconnect, SpaceInfo, SpaceInfoRequest, Update},
    storage,
};

pub type ID = usize;

#[derive(Debug, Clone)]
pub struct Space {
    id: ID,
    storage: storage::Service,
    recipients: HashMap<usize, Recipient<Update>>,
}

impl Space {
    pub fn new(id: ID) -> Space {
        Space {
            id,
            recipients: HashMap::new(),
            storage: storage::Service::new(id),
        }
    }

    fn broadcast(&self, msg: Update) {
        for (_, user) in self.recipients.iter() {
            user.do_send(msg.clone())
        }
    }

    fn register(&mut self, user_id: usize, profile: UserProfile, addr: Recipient<Update>) {
        self.recipients.insert(user_id, addr);
        self.storage.upsert(Action::Join { payload: profile });
    }

    fn unregister(&mut self, user_id: usize) -> Option<Recipient<Update>> {
        self.storage.upsert(Action::Leave { payload: user_id });
        self.recipients.remove(&user_id)
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
        self.register(msg.user.id, msg.user.clone(), msg.addr);
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
        for (user_id, user) in self.recipients.iter() {
            if msg.user_id != *user_id {
                user.do_send(msg.clone())
            }
        }
    }
}

impl Handler<SpaceInfoRequest> for Space {
    type Result = SpaceInfo;

    fn handle(&mut self, _msg: SpaceInfoRequest, _ctx: &mut Self::Context) -> Self::Result {
        self.storage.get()
    }
}
