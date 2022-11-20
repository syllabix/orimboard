//! # storage
//!
//! a module that supports data storage for a board
//!

mod service;
mod backend;
mod kafka;

pub use self::service::Service;