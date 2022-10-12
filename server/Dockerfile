FROM rust:1.64-slim as builder

WORKDIR /app
COPY ./ /app/

RUN cargo install --path .

# Debian 11 (bullseye)
FROM debian:11-slim

COPY --from=builder /usr/local/cargo/bin/orim-board-server /usr/local/bin/orim-board-server

ENV HOST "0.0.0.0"
ENV CORS_ALLOW_ORIGIN "http://orimboard.io"

CMD ["orim-board-server"]
