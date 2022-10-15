//! # handler
//!
//! the handler module contains http
//! handlers

mod health_check;
pub mod user;
pub mod board;

pub use self::health_check::health_check;
