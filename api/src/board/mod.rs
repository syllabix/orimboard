//! # board
//!
//! the board module contains various
//! utilities to allocate and discover boards, as well as retrieve data
//!

mod component;
mod payload;

#[cfg(feature = "agones_sdk")]
mod agones;
#[cfg(feature = "agones_sdk")]
pub use self::agones::Client;

#[cfg(not(feature = "agones_sdk"))]
mod local;
#[cfg(not(feature = "agones_sdk"))]
pub use self::local::Client;
