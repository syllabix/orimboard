use agones::Sdk;
use tokio::{sync::mpsc, task};

use std::collections::{HashMap, HashSet};

use super::{BoardEvent, Error};

use super::HealthChecker;

pub struct Manager {
    board_events: mpsc::Sender<BoardEvent>,
    _health_checker: HealthChecker,
}

type UsersByBoard = HashMap<usize, HashSet<usize>>;

struct BoardEventHandler {
    sdk: Sdk,
    boards_map: UsersByBoard,
    max_board_count: usize,
    max_user_count: usize,
}

impl BoardEventHandler {
    pub fn from_env(sdk: Sdk) -> BoardEventHandler {
        let max_board_count = std::env::var("BOARD_CAPACITY")
            .map(|c| c.parse::<usize>().expect("Invalid board capacity"))
            .unwrap_or(1);

        let max_user_count = std::env::var("USER_CAPACITY")
            .map(|c| c.parse::<usize>().expect("Invalid user capacity"))
            .unwrap_or(1000);

        BoardEventHandler {
            sdk,
            boards_map: HashMap::new(),
            max_board_count,
            max_user_count,
        }
    }

    async fn handle_events(mut self, mut rx: mpsc::Receiver<BoardEvent>) {
        log::info!(
            "Starting board event handler... Server capacity: max_boards={}, max_users={}",
            self.max_board_count,
            self.max_user_count
        );
        loop {
            if let Some(action) = rx.recv().await {
                match action {
                    BoardEvent::Ready => self.ready().await,
                    BoardEvent::Shutdown => self.shutdown().await,
                    BoardEvent::BoardLoaded { id } => self.board_loaded(id).await,
                    BoardEvent::BoardClosed { id } => self.board_closed(id).await,
                    BoardEvent::UserConnected { board_id, user_id } => {
                        self.user_connected(board_id, user_id).await
                    }
                    BoardEvent::UserLeft { board_id, user_id } => {
                        self.user_disconnected(board_id, user_id).await
                    }
                }
            }
        }
    }

    async fn ready(&mut self) {
        self.sdk
            .ready()
            .await
            .and({
                let mut alpha_sdk = self.sdk.alpha().clone();
                alpha_sdk.set_player_capacity(1000).await
            })
            .expect("Can't send ready signal.")
    }

    async fn shutdown(&mut self) {
        log::info!("Shutdown server");
        self.sdk.shutdown().await.or::<()>(Result::Ok(())).unwrap()
    }

    async fn board_closed(&mut self, space_id: usize) {
        log::info!("Space id={} disconnected", space_id);
        self.boards_map.remove(&space_id);
        // self.sdk
        //     .set_label(format!("gs-{}", &space_id), "")
        //     .await
        //     .expect(format!("Can't set label board-{} -> ''", &space_id).as_str());

        if self.boards_map.len() == 0 {
            self.sdk.shutdown().await.expect("Can't shutdown server.")
        } else {
            self.sdk
                .ready() // set ready, we can accept more boards
                .await
                .expect("Can't send ready signal.")
        }
    }

    async fn board_loaded(&mut self, space_id: usize) {
        log::info!("Space id={} loaded", space_id);
        self.boards_map
            .entry(space_id)
            .or_insert_with(|| HashSet::new());
        // self.sdk
        //     .set_label(format!("gs-{}", space_id), "space-id")
        //     .await
        //     .expect(format!("Can't reserve space {}", space_id).as_str());
        if self.boards_map.len() == self.max_board_count {
            self.sdk
                .allocate() // set allocated so that agones knows not to schedule this board.
                .await
                .expect("Can't mark server as 'allocated'");
        }
    }

    async fn user_connected(&mut self, board_id: usize, user_id: usize) {
        log::info!("User id={} connected to board id={}", user_id, board_id);
        let mut alpha_sdk = self.sdk.alpha().clone();
        let _ = self
            .boards_map
            .get_mut(&board_id)
            .expect("Board missing")
            .insert(user_id);
        alpha_sdk
            .player_connect(user_id.to_string())
            .await
            .expect("User connection not registered");
    }

    async fn user_disconnected(&mut self, board_id: usize, user_id: usize) {
        log::info!(
            "User id={} disconnected from board id={}",
            user_id,
            board_id
        );
        let _ = self
            .boards_map
            .get_mut(&board_id)
            .expect("Board missing")
            .remove(&user_id);

        let mut alpha_sdk = self.sdk.alpha().clone();
        alpha_sdk
            .player_disconnect(user_id.to_string())
            .await
            .expect("User disconnection not registered");

        let user_count = self.boards_map.get(&board_id).expect("Board missing").len();
        if user_count == 0 {
            self.board_closed(board_id).await;
        }
    }
}

impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        log::info!("connecting to agones sdk sidecar...");
        let sdk = Sdk::new(None, None)
            .await
            .map_err(|e| Error::SetupFailure(format!("{}", e)))?;

        let health_checker = HealthChecker::new(&sdk);

        let handler = BoardEventHandler::from_env(sdk);
        let (board_events, rx) = mpsc::channel::<BoardEvent>(10);

        task::spawn(handler.handle_events(rx));

        Ok(Manager {
            _health_checker: health_checker,
            board_events,
        })
    }

    pub fn board_events(&self) -> mpsc::Sender<BoardEvent> {
        self.board_events.clone()
    }
}
