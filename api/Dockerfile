FROM rust:1.74-slim as builder

WORKDIR /build
RUN cargo init --bin --name orim-api
COPY Cargo.toml /build/

RUN cargo build --release
RUN rm src/*.rs && rm target/release/deps/orim_api*

COPY src /build/src

RUN cargo build --release

# Debian 11 (bullseye)
FROM debian:12-slim

RUN apt update
RUN apt install curl -y

WORKDIR /app
COPY --from=builder /build/target/release/orim-api /app/

ENV HOST "0.0.0.0"
ENV RUST_LOG "debug"
ENV CORS_ALLOW_ORIGIN "http://orimboard.io"
ENV AGONES_ALLOCATOR_URL "http://agones-allocator.agones-sys.svc.cluster.local"

CMD ["./orim-api"]
