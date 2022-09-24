use dashmap::DashMap;
use rand::prelude::StdRng;
use rand::{Rng, SeedableRng};
use std::sync::{Arc, Mutex};
use std::time::SystemTime;

type UserId = u32;
type Email = String;

#[derive(Clone)]
pub struct Model {
    pub id: u32,
    pub name: String,
    pub email: String,
    pub created_at: SystemTime,
    pub updated_at: SystemTime,
}

#[derive(Debug)]
pub enum Error {
    NotFound,
    EmailInUse,
    SystemFailure,
}

#[derive(Clone)]
pub struct Database {
    ids: Arc<Mutex<StdRng>>,
    by_id: Arc<DashMap<UserId, Model>>,
    by_email: Arc<DashMap<Email, Model>>,
}

impl Database {
    pub fn new() -> Database {
        Database {
            ids: Arc::new(Mutex::new(StdRng::from_entropy())),
            by_id: Default::default(),
            by_email: Default::default(),
        }
    }

    pub async fn create(&self, user: Model) -> Result<Model, Error> {
        if self.by_email.contains_key(user.email.as_str()) {
            return Err(Error::EmailInUse);
        }

        let new_id: UserId = match self.ids.lock() {
            Ok(mut id) => id.gen(),
            Err(_) => return Err(Error::SystemFailure),
        };

        let now = SystemTime::now();
        let new_user = Model {
            id: new_id,
            name: user.name,
            email: user.email,
            created_at: now,
            updated_at: now,
        };

        self.by_email
            .insert(new_user.email.clone(), new_user.clone());
        self.by_id.insert(new_id, new_user);

        return self.get(new_id).await;
    }

    pub async fn get(&self, id: UserId) -> Result<Model, Error> {
        if let Some(user) = self.by_id.get(&id) {
            return Ok(user.value().clone());
        }

        Err(Error::NotFound)
    }

    pub async fn get_all(&self) -> Result<Vec<Model>, Error> {
        let result: Vec<Model> = self
            .by_id
            .iter()
            .map(|entry| entry.value().to_owned())
            .collect();
        Ok(result)
    }
}
