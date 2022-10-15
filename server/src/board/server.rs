use actix::{Actor, Addr};
use dashmap::DashMap;

use super::{
    message::{SpaceInfo, SpaceInfoRequest},
    space::{self, Space},
};

#[derive(Debug, Clone)]
pub struct Registry {
    spaces: DashMap<space::ID, Addr<Space>>,
}

impl Registry {
    pub fn new() -> Registry {
        Registry {
            spaces: Default::default(),
        }
    }

    pub fn get_or_create(&self, id: space::ID) -> Addr<Space> {
        if let Some(addr) = self.spaces.get(&id) {
            return addr.clone();
        }

        let space = Space::new(id).start();
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
