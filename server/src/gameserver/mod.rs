//! # gameserver
//!
//! utilites for managing the gameserver
//!

#[cfg(feature = "agones_sdk")]
mod healthcheck;
#[cfg(feature = "agones_sdk")]
mod watcher;

mod manager;

pub use self::manager::BoardEvent;
pub use self::manager::Manager;
