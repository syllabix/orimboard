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

## Set up storage systems (kafka and materialize)
storage.start:
	docker compose up

## Stop and tear down storage systems (kafka and materialize)
storage.stop:
	docker compose down

## Run db migrations that will configure Materialize DB
migrate.up:
	psql postgresql://materialize:materialize@localhost:6875/materialize -f .migrations/core_tables.sql

## Start up the orim board server
run.server:
	cd server && cargo run