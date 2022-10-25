//! # gameserver
//!
//! utilites for managing the gameserver
//!

mod manager;
mod healthcheck;
mod watcher;

pub use self::manager::Manager;
pub use self::manager::BoardEvent;
