
## sets the cloud project name when provisioning kubernetes cluster
project := ""

## Print the help message.
# Parses this Makefile and prints targets that are preceded by "##" comments.
help:
	@echo "" >&2
	@echo "Available targets: " >&2
	@echo "" >&2
	@awk -F : '\
			BEGIN { in_doc = 0; } \
			/^##/ && in_doc == 0 { \
				in_doc = 1; \
				doc_first_line = $$0; \
				sub(/^## */, "", doc_first_line); \
			} \
			$$0 !~ /^#/ && in_doc == 1 { \
				in_doc = 0; \
				if (NF <= 1) { \
					next; \
				} \
				printf "  %-15s %s\n", $$1, doc_first_line; \
			} \
			' <"$(abspath $(lastword $(MAKEFILE_LIST)))" \
		| sort >&2
	@echo "" >&2

## Start up the orim client
run.client:
	cd client && npm install
	cd client && npm run dev

## Start up the orim api server
run.api:
	cd api && cargo run

## Start up the orim board server
run.server:
	cd server && cargo run

## Provisions kubernetes cluster with Google Kubernetes Engine. ex: make cluster.gke project=orimboard
cluster.gke:
	./.cloud/gcp/setup.sh $(project)

## Deploys orimboard and its dependencies to the kubernetes cluster. ex: make deploy.gke project=orimboard
deploy.gke:
	skaffold run --profile agones --default-repo=europe-west4-docker.pkg.dev/$(project)/orimboard-artifact-registry

## Setup the Agones helm chart
setup.agones:
	helm repo add agones https://agones.dev/chart/stable
	helm repo update