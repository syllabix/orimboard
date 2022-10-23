use std::time::Duration;

use agones::Sdk;
use tokio::{sync::mpsc, task};

#[cfg(feature = "agones_sdk")]
use super::healthcheck::HealthChecker;

#[derive(thiserror::Error, Debug)]
pub enum Error {
    #[error("failed to establish connection with game server fleet: `{0}`")]
    SetupFailure(String),
    #[error("failed to mark the server as ready: `{0}`")]
    ReadinessIssue(String),
    #[error("failed to cleanly shutdown the server: `{0}`")]
    ShutdownFailure(String),
    #[error("failed reserve the board server: `{0}`")]
    ReservationFailed(String),
}

#[cfg(feature = "agones_sdk")]
pub struct Manager {
    sdk: Sdk,
    _health_checker: HealthChecker,
    spaces_sender: mpsc::Sender<usize>
}

#[cfg(feature = "agones_sdk")]
impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        log::info!("connecting to agones sdk sidecar...");
        let sdk = Sdk::new(None, None)
            .await
            .map_err(|e| Error::SetupFailure(format!("{}", e)))?;

        let health_checker = HealthChecker::new(&sdk);
        let sender = Manager::new_spaces_channel(&sdk);
        Ok(Manager {
            sdk,
            _health_checker: health_checker,
            spaces_sender: sender
        })
    }

    fn new_spaces_channel(sdk: &Sdk) -> mpsc::Sender<usize> {
        let (tx, mut rx) = mpsc::channel::<usize>(10);
        let mut my_sdk = sdk.clone();
        task::spawn(async move {
            loop {
                while let Some(space_id) = rx.recv().await {
                    log::debug!("Reserving for space ID: {:?}", space_id);
                    my_sdk.reserve(Duration::from_secs(30))
                        .await
                        .expect(format!("Can't reserve space {}", space_id).as_str())
                }
            }
        });

        tx
    }

    pub fn spaces_handle(&self) -> mpsc::Sender<usize> {
        self.spaces_sender.clone()
    }

    pub async fn ready(&mut self) -> Result<(), Error> {
        self.sdk
            .ready()
            .await
            .map_err(|e| Error::ReadinessIssue(format!("{}", e)))
    }

    pub async fn shutdown(&mut self) -> Result<(), Error> {
        self.sdk
            .shutdown()
            .await
            .map_err(|e| Error::ShutdownFailure(format!("{}", e)))
    }
}

#[cfg(not(feature = "agones_sdk"))]
pub struct Manager();

#[cfg(not(feature = "agones_sdk"))]
impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        Ok(Manager {})
    }

    pub async fn ready(&mut self) -> Result<(), Error> {
        Ok(())
    }

    pub async fn shutdown(&mut self) -> Result<(), Error> {
        Ok(())
    }
}
