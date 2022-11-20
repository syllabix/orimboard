use std::{fmt, sync::Arc};

use rdkafka::{
    producer::{BaseRecord, ThreadedProducer},
    ClientConfig,
};

use crate::board::{
    component::{ChatMessage, Widget, DrawnLine},
    space,
};

use super::kafka;

#[derive(Debug)]
pub struct Error {
    reason: String,
}

#[derive(Clone)]
pub struct Backend {
    producer: Arc<ThreadedProducer<kafka::CallbackLogger>>,
}

impl Backend {
    pub fn new() -> Self {
        log::info!("setting up kafka producer...");
        let producer = ClientConfig::new()
            .set("bootstrap.servers", "localhost:9092")
            .create_with_context(kafka::CallbackLogger {})
            .expect("failed to create kafka client");

        Backend {
            producer: Arc::new(producer),
        }
    }

    pub fn upsert_widget(&self, widget: &Widget) -> Result<(), Error> {
        let data = serde_json::to_vec(widget).unwrap();
        match self.producer.send(
            BaseRecord::to("widgets")
                .key(&widget.id)
                .payload(data.as_slice()),
        ) {
            Ok(_) => Ok(()),
            Err(e) => Err(Error {
                reason: e.0.to_string(),
            }),
        }
    }

    pub fn upsert_chat(&self, message: &ChatMessage) -> Result<(), Error> {
        let data = serde_json::to_vec(message).unwrap();
        match self.producer.send(
            BaseRecord::to("chats")
                .key(&message.id)
                .payload(data.as_slice()),
        ) {
            Ok(_) => Ok(()),
            Err(e) => Err(Error {
                reason: e.0.to_string(),
            }),
        }
    }

    pub fn upsert_drawn_line(&self, line: &DrawnLine) -> Result<(), Error> {
        let data = serde_json::to_vec(line).unwrap();
        match self.producer.send(
            BaseRecord::to("drawn_lines")
                .key(&line.id)
                .payload(data.as_slice()),
        ) {
            Ok(_) => Ok(()),
            Err(e) => Err(Error {
                reason: e.0.to_string(),
            }),
        }
    }
}

impl fmt::Debug for Backend {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Backend").finish()
    }
}
