//! # handler
//!
//! the handler module contains http
//! handlers

pub mod board;
mod health_check;
pub mod user;

pub use self::health_check::health_check;
