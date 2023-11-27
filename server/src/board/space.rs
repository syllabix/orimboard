use std::{collections::HashMap, time::SystemTime};

use actix::{Actor, ActorFutureExt, Context, Handler, Recipient, ResponseActFuture, WrapFuture};
use tokio::sync::mpsc::Sender;

use crate::gameserver::BoardEvent;

use super::{
    component::UserProfile,
    message::{Action, Connect, Disconnect, SpaceInfo, SpaceInfoRequest, Update},
    storage, user,
};

pub type ID = usize;

#[derive(Debug, Clone)]
pub struct Space {
    id: ID,
    storage: storage::Service,
    recipients: HashMap<usize, Recipient<Update>>,
    space_callback: Sender<BoardEvent>,
}

impl Space {
    pub fn new(id: ID, space_callback: Sender<BoardEvent>) -> Space {
        Space {
            id,
            recipients: HashMap::new(),
            storage: storage::Service::new(id),
            space_callback,
        }
    }

    fn broadcast(&self, msg: Update) {
        for (_, user) in self.recipients.iter() {
            user.do_send(msg.clone())
        }
    }

    fn register(&mut self, user: UserProfile, addr: Recipient<Update>) {
        self.recipients.insert(user.id, addr);
        self.storage.upsert(user.id, Action::Join { payload: user });
    }

    fn unregister(&mut self, user_id: user::ID) -> Option<Recipient<Update>> {
        self.storage
            .upsert(user_id, Action::Leave { payload: user_id });
        self.recipients.remove(&user_id)
    }

    fn upsert(&mut self, user_id: user::ID, action: Action) -> Action {
        self.storage.upsert(user_id, action)
    }
}

impl Actor for Space {
    type Context = Context<Self>;
}

impl Handler<Connect> for Space {
    type Result = ResponseActFuture<Space, ()>;

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        log::info!("user {} connecting to space {}", &msg.user.id, &self.id);

        let board_id = self.id;
        let callback = self.space_callback.clone();
        Box::pin(
            async move {
                callback
                    .send(BoardEvent::UserConnected {
                        board_id: board_id,
                        user_id: msg.user.id,
                    })
                    .await
                    .expect("Can't publish user connect event")
            }
            .into_actor(self)
            .map(|_, spc, _ctx| {
                spc.register(msg.user.clone(), msg.addr);
                spc.broadcast(Update {
                    user_id: msg.user.id,
                    action: Action::Join { payload: msg.user },
                    created_at: SystemTime::now(),
                })
            }),
        )
    }
}

impl Handler<Disconnect> for Space {
    type Result = ResponseActFuture<Space, ()>;

    fn handle(&mut self, msg: Disconnect, _ctx: &mut Self::Context) -> Self::Result {
        log::info!(
            "user {} disconnecting from space {}",
            &msg.user_id,
            &self.id
        );

        let board_id = self.id;
        let callback = self.space_callback.clone();
        Box::pin(
            async move {
                callback
                    .send(BoardEvent::UserLeft {
                        board_id: board_id,
                        user_id: msg.user_id,
                    })
                    .await
                    .expect("Can't publish user disconnect event")
            }
            .into_actor(self)
            .map(move |_, spc, _ctx| {
                spc.unregister(msg.user_id);
                spc.broadcast(Update {
                    user_id: msg.user_id,
                    action: Action::Leave {
                        payload: msg.user_id,
                    },
                    created_at: SystemTime::now(),
                })
            }),
        )
    }
}

impl Handler<Update> for Space {
    type Result = ();

    fn handle(&mut self, mut msg: Update, _ctx: &mut Self::Context) -> Self::Result {
        msg.action = self.upsert(msg.user_id, msg.action);
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
