FROM rust:alpine AS builder

WORKDIR /build

# Install target platform (Cross-Compilation) --> Needed for Alpine
RUN rustup target add x86_64-unknown-linux-musl
RUN apk update
RUN apk add --no-cache musl-dev protoc

RUN cargo init --bin --name orim-board-server
COPY Cargo.lock Cargo.toml /build/

RUN cargo build --release
RUN rm src/*.rs && rm target/release/deps/orim_board_server*

COPY src /build/src

RUN cargo build --release

FROM alpine:3.16.0 AS runtime

WORKDIR /app
COPY --from=builder /build/target/release/orim-board-server /app/

ENV PORT "8888"
ENV HOST "0.0.0.0"
ENV RUST_LOG "info"
ENV CORS_ALLOW_ORIGIN "http://orimboard.io"

CMD ["./orim-board-server"]
