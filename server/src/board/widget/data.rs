use std::collections::HashMap;

use dashmap::DashMap;

type SpaceId = usize;

#[derive(Debug, Copy, Clone)]
pub enum WidgetKind {
    Sticky,
    Rect,
    Circle,
    Star,
}

#[derive(Debug, Clone)]
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
    pub text: String,
}

#[derive(Debug, Clone)]
pub struct Storage {
    widgets: DashMap<SpaceId, HashMap<String, Widget>>,
}

impl Storage {
    pub fn new() -> Storage {
        Storage {
            widgets: Default::default(),
        }
    }

    pub fn upsert(&self, space_id: SpaceId, data: Widget) -> &Widget {
        let widgets = self.widgets.entry(space_id).or_insert_with(|| HashMap::new());
        let id = data.id.clone();
        widgets.insert(id.clone(), data);
        let w = widgets.get(&id);
        let w = w.unwrap();
        w
    }
}