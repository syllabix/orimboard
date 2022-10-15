use std::{time::SystemTime};

use dashmap::DashMap;
use rand::{thread_rng, Rng};
use random_color::{Color, RandomColor};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Participant {
    pub id: u16,
    pub name: String,
    pub color: String,

    #[serde(with = "serde_millis")]
    pub created_at: SystemTime,
}

pub struct Registry {
    users: DashMap<u16, Participant>,
}

impl Registry {
    pub fn new() -> Registry {
        Registry {
            users: Default::default(),
        }
    }

    pub fn get(&self, id: u16) -> Option<Participant> {
        match self.users.get(&id) {
            Some(entry) => Some(entry.value().to_owned()),
            None => None,
        }
    }

    pub fn get_all(&self) -> Vec<Participant> {
        self.users.iter().map(|entry| entry.clone()).collect()
    }

    pub fn create(&self, name: &str) -> Participant {
        let id = thread_rng().gen();
        let user = Participant {
            id,
            name: name.to_string(),
            color: RandomColor::new().hue(Color::Monochrome).to_hex(),
            created_at: SystemTime::now(),
        };
        self.users.insert(user.id, user.clone());
        user
    }
}
