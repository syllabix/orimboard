use std::time::SystemTime;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Participant {
    pub id: u16,
    pub name: String,
    pub color: String,

    #[serde(with = "serde_millis")]
    pub created_at: SystemTime,
}
