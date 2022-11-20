use std::{
    fmt,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::Duration,
};

use rdkafka::{
    producer::{BaseProducer, BaseRecord},
    ClientConfig,
};
use tokio::task::JoinHandle;

use crate::board::space;

use super::kafka;

#[derive(Debug)]
pub struct Error {
    reason: String,
}

#[derive(Clone)]
pub struct Backend {
    producer: BaseProducer<kafka::CallbackLogger>,
    should_stop: Arc<AtomicBool>,
    handle: Arc<JoinHandle<()>>,
}

impl Backend {
    pub fn new() -> Self {
        log::info!("setting up kafka producer...");
        let producer = ClientConfig::new()
            .set("bootstrap.servers", "localhost:9092")
            .set("security.protocol", "PLAINTEXT")
            .create_with_context(kafka::CallbackLogger {})
            .expect("failed to create kafka client");

        Backend::setup(producer)
    }

    pub fn upsert(&self, id: space::ID, data: &[u8]) -> Result<(), Error> {
        log::info!("send message to kafka...");
        let space_id = format!("space-{}", id);
        match self
            .producer
            .send(BaseRecord::to("widgets").key(&space_id).payload(data))
        {
            Ok(_) => {
                log::info!("message sent ok!");
                Ok(())
            },
            Err(e) => Err(Error {
                reason: e.0.to_string(),
            }),
        }
    }

    fn setup(producer: BaseProducer<kafka::CallbackLogger>) -> Self {
        let should_stop = Arc::new(AtomicBool::new(false));

        let handle = {
            let producer = producer.clone();
            let should_stop = should_stop.clone();
            tokio::spawn(async move {
                loop {
                    let n = producer.poll(Duration::from_millis(100));
                    if n == 0 {
                        if should_stop.load(Ordering::Relaxed) {
                            // We received nothing and the thread should
                            // stop, so break the loop.
                            break;
                        }
                    } else {
                        log::info!("Received {} events", n);
                    }
                }
            })
        };
        log::info!("setup polling thread - let's go!");
        Backend {
            producer,
            should_stop,
            handle: Arc::new(handle),
        }
    }
}

impl fmt::Debug for Backend {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Backend").finish()
    }
}

impl Drop for Backend {
    fn drop(&mut self) {
        log::info!("Stopping polling");
        self.should_stop.store(true, Ordering::Relaxed);
        log::info!("Waiting for polling thread termination");
        self.handle.abort()
    }
}
