use std::time::Duration;

use tokio::{sync::oneshot, task};

#[cfg(feature = "agones_sdk")]
pub struct HealthChecker {
    _sender: oneshot::Sender<()>
}

#[cfg(feature = "agones_sdk")]
impl HealthChecker {
    pub fn new(sdk: &agones::Sdk) -> HealthChecker {
        log::info!("Starting health check via agones...");
        HealthChecker { _sender: HealthChecker::create_channel(sdk) }
    }

    fn create_channel(sdk: &agones::Sdk) -> oneshot::Sender<()> {
        let health_tx = sdk.health_check();
        let (tx, mut rx) = oneshot::channel::<()>();

        task::spawn(async move {
            let mut interval = tokio::time::interval(Duration::from_secs(2));

            loop {
                tokio::select! {
                    _ = interval.tick() => {
                        match health_tx.send(()).await {
                            Ok(_) => log::debug!("health check ping ok"),
                            Err(e) => {
                                log::error!("game server health check failed: {}", e);
                                break;
                            },
                        }
                    }

                    _ = &mut rx => {
                        log::info!("health check task cancelled");
                        break;
                    }
                }
            }
        });

        tx
    }
}
