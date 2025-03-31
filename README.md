# orim

a collaborative chat and white board app built with Rust and Next.js

## purpose

to experiment with implementing latency sensitive web applications with Rust and Web Canvas (via React).

## project architecture

Orimboard is composed of 3 micro services:

1. The client (a next.js web app - used for rendering the UI, whiteboards, etc)
2. The API (a backend used to manage user state, facilitate new game server allocation, handle general business logic etc)
3. The (board)server - the real time engine used to facilitate collaborative white board editing and chat

When running in k8s - the board servers are treated as game servers, and are managed by [Agones](https://agones.dev). The allocator service provided by the agones system is used to spin up new board servers and expose them for direct web socket connections.

### getting started

1. [Install Rust](https://www.rust-lang.org/tools/install) ( >= rustc 1.85.1 )
2. [Install Node.js](https://nodejs.org/en/download/current/) (>= v18.9.0)

```bash
## start up the api server
make run.api

## start up the board server
make run.server

## start up the client
make run.client
```

then open multiple web browsers @ <http://localhost:3000>

### minikube quickstart

orim can run on Kubernetes locally with `skaffold` and `minikube`. This setup was tested on MacOS with following versions:

- `minikube` (>= 1.27.1)
- `skaffold` (>= 1.39.2)
- `virtualbox` (>= 6.1.38) **Required for MacOS** - for linux, you can safely skip this!

1. Start and configure `minikube`:

```bash
minikube delete # optional - deletes old minikube setup if exists.
minikube start
minikube addons enable ingress
```

Note: On Mac, we need to use `minikube start --driver=virtualbox`, because networking with the default `docker` driver can be quite challenging and we need to use multiple tunnels that need to run on background :/

2. Add IP address for `orimboard.io` into the `/etc/hosts` file (needs administrator access):

```bash
minikube ip # Returns the IP address of the minikube VM

# Add following entry to the /etc/hosts (replacing the IP address)
# 192.168.49.2 orimboard.io
```

3. Trigger `skaffold dev` for auto-rebuild on source code update:

```bash
skaffold dev
```

Skaffold will build the docker images using the `docker` host on `minikube`, and then deploy kubernetes resourcess. It will need some time for the deployment to stabilize.

4. Access <http://orimboard.io> from your favorite browser!

`CTRL + C` will stop `skaffold`, and cleanup and resources that was created at step #3. Then `minikube stop` will stop `minikube`, and could be restarted again with existing images in cache.

## cloud environment setup

There are simple infra scripts in the `.cloud` directory of the project that can be run to provision a minimum viable compute environment for orimboard.
**Important** - the following commands will provision billable infrastructure. Please consult your current account information with your perspective cloud provider.

### Google Cloud

Ensure you have [gcloud](https://cloud.google.com/sdk/gcloud/) installed. Once setup, run the following:

```bash
# you must provide a value for $PROJECT_ID. region and clustername will fallback to defaults. please consult the script
make cluster.gke project=<your gcp project name>
```

### Amazon Web Services (coming soon)

There is an example script in the .cloud/aws directory, but please be advised it is not tested.

## known issues

1. shape rotation transforms do not sync across state yet

## roadmap

1. support rotation transforms for shapes
2. setup basic user and auth system
4. panning and zoom
