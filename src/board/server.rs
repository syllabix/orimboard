use actix::{Actor, Addr, Context, Handler, Message, Recipient};
use actix_web::{web, Error, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use rand::Rng;
use std::collections::HashMap;

use super::{
    space::{Space, Update},
    user::User,
};

#[derive(Message)]
#[rtype(result = "()")]
pub struct Connect {
    pub user_id: usize,
    pub space_id: usize,
    pub addr: Recipient<Update>,
}

#[derive(Message)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub user_id: usize,
    pub space_id: usize,
}

#[derive(Debug, Clone)]
pub struct BoardServer {
    spaces: HashMap<usize, Space>,
}

impl BoardServer {
    pub fn new() -> BoardServer {
        BoardServer {
            spaces: Default::default(),
        }
    }
}

impl Actor for BoardServer {
    type Context = Context<Self>;
}

impl Handler<Connect> for BoardServer {
    type Result = ();

    fn handle(&mut self, msg: Connect, _ctx: &mut Self::Context) -> Self::Result {
        println!(
            "user {} connecting to space {}",
            &msg.user_id, &msg.space_id
        );
        if let Some(space) = self.spaces.get_mut(&msg.space_id) {
            space.register(msg.user_id, msg.addr);
            return;
        }

        let mut space = Space::new(msg.space_id);
        space.register(msg.user_id, msg.addr);
        self.spaces.insert(msg.space_id, space);
    }
}

impl Handler<Disconnect> for BoardServer {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, ctx: &mut Self::Context) -> Self::Result {
        println!(
            "user {} disconnecting from space {}",
            &msg.user_id, &msg.space_id
        );

        if let Some(space) = self.spaces.get_mut(&msg.space_id) {
            space.unregister(msg.user_id);
            return;
        }
    }
}

impl Handler<Update> for BoardServer {
    type Result = ();

    fn handle(&mut self, msg: Update, _ctx: &mut Self::Context) -> Self::Result {
        if let Some(space) = self.spaces.get(&msg.space_id) {
            for (_, user) in space.users.iter() {
                user.do_send(msg.clone())
            }
        }
    }
}

pub async fn start_up(
    req: HttpRequest,
    stream: web::Payload,
    server: web::Data<Addr<BoardServer>>,
) -> Result<HttpResponse, Error> {
    let user_id: usize = rand::thread_rng().gen();
    let space_id: usize = req.match_info().get("id").unwrap().parse().unwrap();
    ws::start(
        User {
            user_id,
            space_id,
            name: String::from("Tom"),
            color: String::from("blue"),
            addr: server.get_ref().clone(),
        },
        &req,
        stream,
    )
}
