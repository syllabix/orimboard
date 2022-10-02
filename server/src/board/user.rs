use std::time::SystemTime;

use actix::prelude::*;
use actix_web_actors::ws::{self, Message, ProtocolError};
use serde_json;

use super::{
    server::{BoardServer, Connect, Disconnect},
    space::{Update, Action},
};

pub struct User {
    pub user_id: usize,
    pub space_id: usize,
    pub name: String,
    pub color: String,
    pub addr: Addr<BoardServer>,
}

impl Actor for User {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        let addr = ctx.address();
        self.addr
            .try_send(Connect {
                user_id: self.user_id,
                space_id: self.space_id,
                addr: addr.recipient(),
            })
            .unwrap();
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        self.addr.do_send(Disconnect {
            user_id: self.user_id,
            space_id: self.space_id,
        })
    }
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for User {
    fn handle(&mut self, msg: Result<Message, ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Text(text)) => {
                let action: Action = match serde_json::from_slice(text.as_bytes()) {
                    Ok(c) => c,
                    Err(e) => {
                        println!("ouch.... {:?}", e);
                        return;
                    }
                };

                self.addr.do_send(Update {
                    user_id: self.user_id,
                    space_id: self.space_id,
                    user_name: self.name.clone(),
                    action,
                    created_at: SystemTime::now(),
                })
            }
            _ => ctx.pong("pong".as_ref()),
        }
    }
}

impl Handler<Update> for User {
    type Result = ();

    fn handle(&mut self, msg: Update, ctx: &mut Self::Context) -> Self::Result {
        let json = serde_json::to_string(&msg).unwrap();
        ctx.text(json)
    }
}
