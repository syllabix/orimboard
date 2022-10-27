use agones::Sdk;
use tokio::{sync::mpsc, task};

use std::collections::{HashMap, HashSet};

use super::{BoardEvent, Error};

use super::HealthChecker;

pub struct Manager {
    board_events: mpsc::Sender<BoardEvent>,
    _health_checker: HealthChecker,
}

type BoardByUsers = HashMap<usize, HashSet<usize>>;

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
        let max_board_count = std::env::var("BOARD_CAPACITY")
            .map(|c| c.parse::<usize>().expect("Invalid board capacity"))
            .unwrap_or(1);

        let max_user_count = std::env::var("USER_CAPACITY")
            .map(|c| c.parse::<usize>().expect("Invalid user capacity"))
            .unwrap_or(1000);

        log::info!(
            "Server capacity: max_boards={}, max_users={}",
            max_board_count,
            max_user_count
        );
        let mut users_by_board: BoardByUsers = HashMap::new();
        loop {
            if let Some(action) = rx.recv().await {
                match action {
                    BoardEvent::Ready => Self::ready(&mut sdk).await,
                    BoardEvent::Shutdown => Self::shutdown(&mut sdk).await,
                    BoardEvent::BoardLoaded { id } => {
                        Self::board_loaded(&mut sdk, id, &mut users_by_board, max_board_count).await
                    }
                    BoardEvent::BoardClosed { id } => {
                        Self::board_closed(&mut sdk, id, &mut users_by_board).await
                    }
                    BoardEvent::UserConnected { board_id, user_id } => {
                        Self::user_connected(&mut sdk, board_id, user_id, &mut users_by_board).await
                    }
                    BoardEvent::UserLeft { board_id, user_id } => {
                        Self::user_disconnected(&mut sdk, board_id, user_id, &mut users_by_board)
                            .await
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

    async fn shutdown(sdk: &mut Sdk) {
        log::info!("Shutdown server");
        sdk.shutdown().await.expect("Can't shutdown server.")
    }

    async fn board_closed(sdk: &mut Sdk, space_id: usize, boards_map: &mut BoardByUsers) {
        log::info!("Space id={} disconnected", space_id);
        boards_map.remove(&space_id);
        sdk.set_label(format!("board-{}", &space_id), "")
            .await
            .expect(format!("Can't set label board-{} -> ''", &space_id).as_str());

        if boards_map.len() == 0 {
            sdk.shutdown().await.expect("Can't shutdown server.")
        } else {
            sdk.ready() // set ready, we can accept more boards
                .await
                .expect("Can't send ready signal.")
        }
    }

    async fn board_loaded(
        sdk: &mut Sdk,
        space_id: usize,
        boards_map: &mut BoardByUsers,
        max_board_count: usize,
    ) {
        log::info!("Space id={} loaded", space_id);
        boards_map.insert(space_id, HashSet::new());
        if boards_map.len() == max_board_count {
            sdk.allocate() // set allocated so that agones knows not to schedule this board.
                .await
                .expect("Can't mark server as 'allocated'");
        }
    }

    async fn user_connected(
        sdk: &mut Sdk,
        board_id: usize,
        user_id: usize,
        boards_map: &mut BoardByUsers,
    ) {
        log::info!("User id={} connected to board id={}", user_id, board_id);
        let mut alpha_sdk = sdk.alpha().clone();
        let _ = boards_map
            .get_mut(&board_id)
            .expect("Board missing")
            .insert(user_id);
        alpha_sdk
            .player_connect(user_id.to_string())
            .await
            .expect("User connection not registered");
    }

    async fn user_disconnected(
        sdk: &mut Sdk,
        board_id: usize,
        user_id: usize,
        boards_map: &mut BoardByUsers,
    ) {
        log::info!(
            "User id={} disconnected from board id={}",
            user_id,
            board_id
        );
        let _ = boards_map
            .get_mut(&board_id)
            .expect("Board missing")
            .remove(&user_id);

        let mut alpha_sdk = sdk.alpha().clone();
        alpha_sdk
            .player_disconnect(user_id.to_string())
            .await
            .expect("User disconnection not registered");

        let user_count = boards_map.get(&board_id).expect("Board missing").len();
        if user_count == 0 {
            Self::board_closed(sdk, board_id, boards_map).await;
        }
    }

    pub fn board_events(&self) -> mpsc::Sender<BoardEvent> {
        self.board_events.clone()
    }
}
