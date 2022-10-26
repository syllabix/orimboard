FROM rust:1.64-slim as builder

WORKDIR /build
RUN cargo init --bin --name orim-user-svc
COPY Cargo.lock Cargo.toml /build/

RUN cargo build --release
RUN rm src/*.rs && rm target/release/deps/orim_user_svc*

COPY src /build/src

RUN cargo build --release

# Debian 11 (bullseye)
FROM debian:11-slim

WORKDIR /app
COPY --from=builder /build/target/release/orim-user-svc /app/


ENV HOST "0.0.0.0"
ENV RUST_LOG "debug"
ENV CORS_ALLOW_ORIGIN "http://orimboard.io"

CMD ["./orim-user-svc"]
