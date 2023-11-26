FROM rust:1.74-slim as builder

WORKDIR /build
RUN cargo init --bin --name orim-board-server
COPY Cargo.toml /build/

RUN cargo build --release
RUN rm src/*.rs && rm target/release/deps/orim_board_server*

COPY src /build/src

RUN cargo build --release

# Debian 12 (bookworm)
FROM debian:12-slim

WORKDIR /app
COPY --from=builder /build/target/release/orim-board-server /app/

ENV HOST "0.0.0.0"
ENV CORS_ALLOW_ORIGIN "http://orimboard.io"
ENV API_BASE_URL "http://api.api.svc.cluster.local/v1/user"

CMD ["./orim-board-server"]
