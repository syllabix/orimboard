//! # board
//!
//! a simple actor based web service for board operations
//!

mod component;
mod registry;

pub mod message;
pub mod space;
pub mod user;

pub use self::registry::Registry;
