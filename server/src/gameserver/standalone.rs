use tokio::{sync::mpsc, task};

use super::{BoardEvent, Error};

pub struct Manager {
    board_events: mpsc::Sender<BoardEvent>,
}

impl Manager {
    pub async fn setup() -> Result<Manager, Error> {
        let sender = Self::new_spaces_channel();
        Ok(Manager {
            board_events: sender,
        })
    }

    fn new_spaces_channel() -> mpsc::Sender<BoardEvent> {
        let (tx, rx) = mpsc::channel::<BoardEvent>(10);

        task::spawn(Self::board_event_handler(rx));

        tx
    }

    async fn board_event_handler(mut rx: mpsc::Receiver<BoardEvent>) {
        loop {
            if let Some(action) = rx.recv().await {
                log::info!("Board event received: {:?}", action);
            }
        }
    }

    pub fn board_events(&self) -> mpsc::Sender<BoardEvent> {
        self.board_events.clone()
    }
}
