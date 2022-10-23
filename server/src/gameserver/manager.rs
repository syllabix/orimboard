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
}

#[cfg(feature = "agones_sdk")]
pub struct Manager {
    sdk: agones::Sdk,
    health_checker: HealthChecker,
}

#[cfg(feature = "agones_sdk")]
impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        log::info!("connecting to agones sdk sidecar...");
        let sdk = agones::Sdk::new(None, None)
            .await
            .map_err(|e| Error::SetupFailure(format!("{}", e)))?;

        let health_checker = HealthChecker::new(sdk.clone());
        Ok(Manager {
            sdk,
            health_checker,
        })
    }

    pub fn start_health_check(&mut self) {
        log::info!("starting health check via agones...");
        self.health_checker.start()
    }

    pub async fn ready(&mut self) -> Result<(), Error> {
        self.sdk
            .ready()
            .await
            .map_err(|e| Error::ReadinessIssue(format!("{}", e)))?;

        Ok(())
    }

    pub async fn shutdown(&mut self) -> Result<(), Error> {
        self.sdk
            .shutdown()
            .await
            .map_err(|e| Error::ShutdownFailure(format!("{}", e)))?;

        Ok(())
    }
}

#[cfg(not(feature = "agones_sdk"))]
pub struct Manager();

#[cfg(not(feature = "agones_sdk"))]
impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        Ok(Manager {})
    }

    pub fn start_health_check(&mut self) {
        log::info!("starting health check...");
    }

    pub async fn ready(&mut self) -> Result<(), Error> {
        Ok(())
    }

    pub async fn shutdown(&mut self) -> Result<(), Error> {
        Ok(())
    }
}
