FROM rust:1.64-slim as builder

WORKDIR /app
COPY ./ /app/

RUN cargo install --path .

# Debian 11 (bullseye)
FROM debian:11-slim

COPY --from=builder /usr/local/cargo/bin/orim-board-server /usr/local/bin/orim-board-server

CMD ["orim-board-server"]
