# orim

a collaborative chat and white board app built with Rust and Next.js

## purpose

to experiment with implementing latency sensitive web applications with Rust and Web Canvas (via React).

### getting started

1. [Install Rust](https://www.rust-lang.org/tools/install) ( >= rustc 1.62.0 )
2. [Install Node.js](https://nodejs.org/en/download/current/) (>= v18.9.0)



```
## start up the server
make run.server

## start up the client
make run.client
```

then open multiple web browsers @ http://localhost:3000

## known issues

1. data persistence has not been setup. while state while be sync'd across all active sessions, refreshing the browser will reset the white board
2. shape rotation transforms do not sync across state yet

## roadmap

1. setup data persistence and storage.
2. support rotation transforms for shapes
3. setup basic user and auth system
4. run on agones/k8s