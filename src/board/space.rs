
use std::collections::HashMap;
use std::time::SystemTime;

use actix::prelude::*;

use serde::Serialize;


#[derive(Message, Serialize, Clone)]
#[rtype(result = "()")]
pub struct Update {
    pub user_id: usize,
    pub space_id: usize,
    pub user_name: String,
    pub content: String,
    pub created_at: SystemTime,
}

#[derive(Debug, Clone)]
pub struct Space {
    id: usize,
    pub users: HashMap<usize, Recipient<Update>>,
}

impl Space {
    pub fn new(id: usize) -> Space {
        Space { id, users: HashMap::new(), }
    }

    pub fn register(&mut self, user_id: usize, addr: Recipient<Update>) {
        self.users.insert(user_id, addr);
    }
}


