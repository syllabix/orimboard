use tokio::{sync::mpsc, task};

#[cfg(feature = "agones_sdk")]
use agones::Sdk;

#[cfg(feature = "agones_sdk")]
use super::healthcheck::HealthChecker;

#[cfg(feature = "agones_sdk")]
use super::watcher::Watcher;

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
    sdk: Sdk,
    _health_checker: HealthChecker,
    _watcher: Watcher,
    board_events: mpsc::Sender<BoardEvent>,
}

#[derive(Debug)]
pub enum BoardEvent {
    Ready,
    Shutdown,
    BoardLoaded { id: usize },
    BoardClosed { id: usize },
    UserConnected { board_id: usize, user_id: usize },
    UserLeft { board_id: usize, user_id: usize },
}

#[cfg(feature = "agones_sdk")]
impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        log::info!("connecting to agones sdk sidecar...");
        let sdk = Sdk::new(None, None)
            .await
            .map_err(|e| Error::SetupFailure(format!("{}", e)))?;

        let watcher = Watcher::new(&sdk);
        let health_checker = HealthChecker::new(&sdk);
        let board_events = Manager::new_spaces_channel(&sdk);
        Ok(Manager {
            sdk,
            _health_checker: health_checker,
            _watcher: watcher,
            board_events,
        })
    }

    fn new_spaces_channel(sdk: &Sdk) -> mpsc::Sender<BoardEvent> {
        let (tx, mut rx) = mpsc::channel::<BoardEvent>(10);
        let mut my_sdk = sdk.clone();
        task::spawn(async move {
            loop {
                if let Some(action) = rx.recv().await {
                    match action {
                        BoardEvent::Ready => Self::ready(&mut my_sdk).await,
                        BoardEvent::Shutdown => Self::shutdown(&mut my_sdk, 0).await,
                        BoardEvent::BoardLoaded { id } => Self::allocate(&mut my_sdk, id).await,
                        BoardEvent::BoardClosed { id } => Self::shutdown(&mut my_sdk, id).await,
                        BoardEvent::UserConnected { board_id, user_id } => {
                            Self::user_connected(&mut my_sdk, board_id, user_id).await
                        }
                        BoardEvent::UserLeft { board_id, user_id } => {
                            Self::user_disconnected(&mut my_sdk, board_id, user_id).await
                        }
                    }
                }
            }
        });

        tx
    }

    async fn ready(sdk: &mut Sdk) {
        sdk.ready().await.expect("Can't send ready signal.")
    }

    async fn shutdown(sdk: &mut Sdk, space_id: usize) {
        log::info!("Space id={} disconnected. Shutdown server", space_id);
        sdk.shutdown().await.expect("Can't shutdown server.")
    }

    async fn allocate(sdk: &mut Sdk, space_id: usize) {
        log::debug!("Allocating for space id={:?}", space_id);
        sdk.allocate()
            .await
            .and({
                sdk.set_label("orimboard-space-id", space_id.to_string())
                    .await
            })
            .expect(format!("Can't reserve space {}", space_id).as_str())
    }

    async fn user_connected(sdk: &mut Sdk, board_id: usize, user_id: usize) {
        log::info!("User id={} connected to board id={}", user_id, board_id);
        let mut alpha_sdk = sdk.alpha().clone();
        alpha_sdk
            .player_connect(user_id.to_string())
            .await
            .expect("User connection not registered");
    }

    async fn user_disconnected(sdk: &mut Sdk, board_id: usize, user_id: usize) {
        log::info!(
            "User id={} disconnected from board id={}",
            user_id,
            board_id
        );
        let mut alpha_sdk = sdk.alpha().clone();
        alpha_sdk
            .player_disconnect(user_id.to_string())
            .await
            .expect("User connection not registered");
    }

    pub fn board_events(&self) -> mpsc::Sender<BoardEvent> {
        self.board_events.clone()
    }
}

#[cfg(not(feature = "agones_sdk"))]
pub struct Manager {
    board_events: mpsc::Sender<BoardEvent>,
}

#[cfg(not(feature = "agones_sdk"))]
impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        let board_events = Manager::new_spaces_channel();
        Ok(Manager { board_events })
    }

    fn new_spaces_channel() -> mpsc::Sender<BoardEvent> {
        let (tx, mut rx) = mpsc::channel::<BoardEvent>(10);
        task::spawn(async move {
            loop {
                if let Some(event) = rx.recv().await {
                    log::info!("board event received: {:?}", event)
                }
            }
        });
        tx
    }

    pub fn board_events(&self) -> mpsc::Sender<BoardEvent> {
        self.board_events.clone()
    }
}
