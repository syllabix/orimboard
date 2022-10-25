use tokio::{sync::oneshot, task};

#[cfg(feature = "agones_sdk")]
pub struct Watcher {
    _watcher: oneshot::Sender<()>
}

#[cfg(feature = "agones_sdk")]
impl Watcher {
    pub fn new(sdk: &agones::Sdk) -> Watcher {
        log::info!("Watching gameserver state changes...");
        Watcher { _watcher: Watcher::create_channel(sdk) }
    }

    fn create_channel(sdk: &agones::Sdk) -> oneshot::Sender<()> {
        let mut client = sdk.clone();
        let (tx, mut rx) = oneshot::channel::<()>();

        task::spawn(async move {
            match client.watch_gameserver().await {
                Err(e) => log::error!("Can't watch gameserver state changes: {}", e),
                Ok(mut stream) => loop {
                    tokio::select! {
                        gs = stream.message() => {
                            match gs {
                                Ok(Some(gs)) => {
                                    log::info!("GameServer Update, name: {}", gs.object_meta.unwrap().name);
                                    log::info!("GameServer Update, state: {}", gs.status.unwrap().state);
                                }
                                Ok(None) => {
                                    log::info!("Server closed the GameServer watch stream");
                                    break;
                                }
                                Err(e) => {
                                    log::error!("GameServer Update stream encountered an error: {}", e);
                                }
                            }
                        }
                        _ = &mut rx => {
                            log::info!("Shutting down GameServer watch loop");
                            break;
                        }
                    }
                }
            }
        });

        tx
    }
}
