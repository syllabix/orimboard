use serde::{Deserialize, Serialize};

use super::user;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum DrawAction {
    Start,
    Stroke,
    Finish,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChatMessage {
    pub text: String,
    pub sent_at: String,

    #[serde(skip_deserializing)]
    pub user: Option<UserProfile>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DrawInstruction {
    pub id: String,
    pub point: Point,
    pub color: String,
    pub action: DrawAction,

    #[serde(skip_deserializing)]
    pub user_id: user::ID,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DrawnLine {
    pub id: String,
    pub color: String,
    pub points: Vec<f64>,
    pub action: DrawAction,
    pub user_id: user::ID,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserPosition {
    pub id: String,
    pub point: Point,
    pub user_id: user::ID,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum WidgetKind {
    Sticky,
    Rect,
    Circle,
    Star,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Widget {
    pub id: String,
    pub kind: WidgetKind,
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
    pub fill: String,
    pub stroke: String,
    pub draggable: bool,

    #[serde(default)]
    pub text: String,

    #[serde(skip_deserializing)]
    pub user_id: user::ID,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct UserProfile {
    pub id: user::ID,
    pub name: String,
    pub color: String,
}
