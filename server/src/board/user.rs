use std::time::{Duration, Instant, SystemTime};

use actix::prelude::*;
use actix_web_actors::ws::{self, Message, ProtocolError};
use serde_json;

use super::{
    component::UserProfile,
    message::{Action, Connect, Disconnect, Update},
    space::Space,
};

// Every 10 seconds - check if this client is alive.
const HEARTBEAT_INTERVAL: Duration = Duration::from_secs(10);
const CLIENT_TIMEOUT: Duration = Duration::from_secs(30);

pub type ID = usize;

pub struct User {
    pub user_id: usize,
    pub name: String,
    pub color: String,
    pub addr: Addr<Space>,
    pub heartbeat: Instant, //TODO Should be private
}

impl Actor for User {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        let addr = ctx.address();
        self.addr
            .try_send(Connect {
                user: UserProfile {
                    id: self.user_id,
                    name: self.name.clone(),
                    color: self.color.clone(),
                },
                addr: addr.recipient(),
            })
            .unwrap();
        // On connection startup - kickoff this user's heartbeat
        self.heartbeat(ctx);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        self.addr.do_send(Disconnect {
            user_id: self.user_id,
        })
    }
}

impl User {
    fn heartbeat(&self, ctx: &mut <Self as Actor>::Context) {
        ctx.run_interval(HEARTBEAT_INTERVAL, |act, ctx| {
            if Instant::now().duration_since(act.heartbeat) > CLIENT_TIMEOUT {
                ctx.stop();
                return;
            }

            println!("Ping! Checking if alive");
            ctx.ping(b"");
        });
    }
}

impl StreamHandler<Result<ws::Message, ProtocolError>> for User {
    fn handle(&mut self, msg: Result<Message, ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(Message::Text(text)) => {
                let action: Action = match serde_json::from_slice(text.as_bytes()) {
                    Ok(c) => c,
                    Err(e) => {
                        log::error!("board action not supported: {:?}", e);
                        return;
                    }
                };

                self.addr.do_send(Update {
                    user_id: self.user_id,
                    action,
                    created_at: SystemTime::now(),
                })
            }
            // The recurring Ping/Pong is used to keep connections alive; for every pong received
            // reset the heartbeat
            Ok(Message::Pong(_)) => {
                println!("Pong! - yep user {} is alive!", self.user_id);
                self.heartbeat = Instant::now();
            }
            _ => ctx.stop(),
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
