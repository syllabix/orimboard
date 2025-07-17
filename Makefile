
## sets the cloud project name when provisioning kubernetes cluster
project := ""

# Default target
.DEFAULT_GOAL := help

# Colors for help output
BLUE := \033[34m
GREEN := \033[32m
RESET := \033[0m

help: ## display this help message
	@echo "$(BLUE)Available targets:$(RESET)"
	@grep -E '^[a-zA-Z0-9_.-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "$(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'

setup: ## install node dependencies and build api and server project
	cd client && npm install
	cd api && cargo build
	cd server && cargo build


run: # start up the complete product in local development mode
	@echo "$(BLUE)Starting up orimboard in local development mode...$(RESET)"
	@make -j 3 client.run server.run api.run

client.run: ## start up the orim client
	cd client && npm install
	cd client && npm run dev

api.run: ## start up the orim api server
	cd api && cargo run

server.run: ## start up the orim board server
	cd server && cargo run

cluster.gke: ## provisions kubernetes cluster with Google Kubernetes Engine. ex: make cluster.gke project=orimboard
	./.cloud/gcp/setup.sh $(project)

deploy.gke: ## deploys orimboard and its dependencies to the kubernetes cluster. ex: make deploy.gke project=orimboard
	skaffold run --profile agones --default-repo=europe-west4-docker.pkg.dev/$(project)/orimboard-artifact-registry

setup.agones: ## setup the Agones helm chart
	helm repo add agones https://agones.dev/chart/stable
	helm repo update