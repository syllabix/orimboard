use agones::Sdk;
use tokio::{sync::mpsc, task};

use super::{BoardEvent, Error};

use super::HealthChecker;

pub struct Manager {
    board_events: mpsc::Sender<BoardEvent>,
    _health_checker: HealthChecker
}

impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        log::info!("connecting to agones sdk sidecar...");
        let sdk = Sdk::new(None, None)
            .await
            .map_err(|e| Error::SetupFailure(format!("{}", e)))?;

        let health_checker = HealthChecker::new(&sdk);
        let board_events = Manager::new_spaces_channel(&sdk);
        Ok(Manager {
            _health_checker: health_checker,
            board_events,
        })
    }

    fn new_spaces_channel(sdk: &Sdk) -> mpsc::Sender<BoardEvent> {
        let (tx, rx) = mpsc::channel::<BoardEvent>(10);

        task::spawn(Self::board_event_handler(sdk.clone(), rx));

        tx
    }

    async fn board_event_handler(mut sdk: Sdk, mut rx: mpsc::Receiver<BoardEvent>) {
        loop {
            if let Some(action) = rx.recv().await {
                match action {
                    BoardEvent::Ready => Self::ready(&mut sdk).await,
                    BoardEvent::Shutdown => Self::shutdown(&mut sdk, 0).await,
                    BoardEvent::BoardLoaded { id } => Self::allocate(&mut sdk, id).await,
                    BoardEvent::BoardClosed { id } => Self::shutdown(&mut sdk, id).await,
                    BoardEvent::UserConnected { board_id, user_id } => {
                        Self::user_connected(&mut sdk, board_id, user_id).await
                    }
                    BoardEvent::UserLeft { board_id, user_id } => {
                        Self::user_disconnected(&mut sdk, board_id, user_id).await
                    }
                }
            }
        }
    }

    async fn ready(sdk: &mut Sdk) {
        sdk.ready()
            .await
            .and({
                let mut alpha_sdk = sdk.alpha().clone();
                alpha_sdk.set_player_capacity(1000).await
            })
            .expect("Can't send ready signal.")
    }

    async fn shutdown(sdk: &mut Sdk, space_id: usize) {
        log::info!("Space id={} disconnected. Shutdown server", space_id);
        sdk.shutdown().await.expect("Can't shutdown server.")
    }

    async fn allocate(sdk: &mut Sdk, space_id: usize) {
        log::info!("Allocating for space id={:?}", space_id);
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
