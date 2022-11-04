use actix::{Actor, Addr};
use dashmap::DashMap;
use tokio::sync::mpsc::Sender;

use crate::gameserver::BoardEvent;

use super::{
    message::{SpaceInfo, SpaceInfoRequest},
    space::{self, Space},
};

#[derive(Debug)]
pub struct Registry {
    spaces: DashMap<space::ID, Addr<Space>>,
    space_callback: Sender<BoardEvent>,
}

impl Registry {
    pub fn new(space_callback: Sender<BoardEvent>) -> Registry {
        Registry {
            spaces: Default::default(),
            space_callback,
        }
    }

    pub async fn get_or_create(&self, id: space::ID) -> Addr<Space> {
        if let Some(addr) = self.spaces.get(&id) {
            return addr.clone();
        }

        let space = Space::new(id, self.space_callback.clone()).start();

        self.space_callback
            .send(BoardEvent::BoardLoaded { id })
            .await
            .expect("Can't publish board load event");

        self.spaces.insert(id, space.clone());
        space
    }

    pub async fn get_space_info(&self, space_id: space::ID) -> Option<SpaceInfo> {
        if let Some(addr) = self.spaces.get(&space_id) {
            return match addr.send(SpaceInfoRequest { space_id }).await {
                Ok(info) => Some(info),
                Err(e) => {
                    log::error!("could not fetch space info. reason: {:?}", e);
                    None
                }
            };
        }
        None
    }
}
