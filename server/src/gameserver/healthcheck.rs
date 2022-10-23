use std::time::Duration;

use tokio::sync::oneshot::Sender;

#[cfg(feature = "agones_sdk")]
pub struct HealthChecker {
    sdk: agones::Sdk,
    tx: Option<Sender<()>>,
}

#[cfg(feature = "agones_sdk")]
impl HealthChecker {
    pub fn new(sdk: agones::Sdk) -> HealthChecker {
        HealthChecker { sdk, tx: None }
    }

    pub fn start(&mut self) {
        let health_tx = self.sdk.health_check();
        let (tx, mut rx) = tokio::sync::oneshot::channel::<()>();

        tokio::task::spawn(async move {
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

        self.tx = Some(tx);
    }
}
