//! # gameserver
//!
//! utilites for managing the gameserver
//!

#[cfg(feature = "agones_sdk")]
mod health;
#[cfg(feature = "agones_sdk")]
mod sdk;

#[cfg(feature = "agones_sdk")]
pub use self::health::HealthChecker;
#[cfg(feature = "agones_sdk")]
pub use self::sdk::Manager;

#[cfg(not(feature = "agones_sdk"))]
mod standalone;

#[cfg(not(feature = "agones_sdk"))]
pub use self::standalone::Manager;

#[derive(Debug)]
pub enum BoardEvent {
    Ready,
    Shutdown,
    BoardLoaded { id: usize },
    BoardClosed { id: usize },
    UserConnected { board_id: usize, user_id: usize },
    UserLeft { board_id: usize, user_id: usize },
}

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("failed to establish connection with game server fleet: `{0}`")]
    SetupFailure(String),
    #[error("failed to mark the server as ready: `{0}`")]
    ReadinessIssue(String),
    #[error("failed to cleanly shutdown the server: `{0}`")]
    ShutdownFailure(String),
}
