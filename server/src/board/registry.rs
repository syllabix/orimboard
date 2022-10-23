use actix::{Actor, Addr};
use dashmap::DashMap;
use tokio::sync::mpsc::Sender;

use super::{
    message::{SpaceInfo, SpaceInfoRequest},
    space::{self, Space},
};

#[derive(Debug)]
pub struct Registry {
    spaces: DashMap<space::ID, Addr<Space>>,
    on_space_loaded: Sender<space::ID>
}

impl Registry {
    pub fn new(on_space_loaded: Sender<usize>) -> Registry {
        Registry {
            spaces: Default::default(),
            on_space_loaded
        }
    }

    pub async fn get_or_create(&self, id: space::ID) -> Addr<Space> {
        if let Some(addr) = self.spaces.get(&id) {
            return addr.clone();
        }

        let space = Space::new(id).start();
        let _ = self.on_space_loaded.send(id)
         .await;

        self.spaces.insert(id, space.clone());
        return space;
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
