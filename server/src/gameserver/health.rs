use std::time::Duration;

use tokio::{sync::mpsc, sync::oneshot, task};

pub struct HealthChecker {
    _sender: oneshot::Sender<()>,
}

impl HealthChecker {
    pub fn new(sdk: &agones::Sdk) -> HealthChecker {
        log::info!("Starting health check via agones...");
        HealthChecker {
            _sender: HealthChecker::create_channel(sdk),
        }
    }

    fn create_channel(sdk: &agones::Sdk) -> oneshot::Sender<()> {
        let (tx, rx) = oneshot::channel::<()>();
        task::spawn(Self::send_health_ping(sdk.health_check(), rx));
        tx
    }

    async fn send_health_ping(health_tx: mpsc::Sender<()>, mut rx: oneshot::Receiver<()>) {
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
    }
}
