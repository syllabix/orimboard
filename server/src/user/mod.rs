//! # user
//!
//! the user module contains various
//! components that manage user state
//!

mod client;
mod registry;

pub use self::client::Client;
pub use self::registry::Participant;
