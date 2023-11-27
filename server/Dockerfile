################
##### Builder
FROM rust:1.74.0-alpine3.18 as builder

RUN apk update
RUN apk add --no-cache musl-dev curl unzip

RUN curl -OL https://github.com/google/protobuf/releases/download/v25.1/protoc-25.1-linux-x86_64.zip
RUN unzip protoc-25.1-linux-x86_64.zip -d protoc3
RUN mv protoc3/bin/* /usr/bin/
RUN mv protoc3/include/* /usr/include/

ENV PROTOC /usr/bin/protoc

WORKDIR /build
COPY Cargo.toml /build/
RUN cargo init --bin --name orim-board-server

RUN cargo build --release
RUN rm src/*.rs && rm target/release/deps/orim_board_server*

COPY src /build/src

RUN cargo build --release

################
##### Runtime
FROM alpine:3.18 as runner

RUN apk update
RUN apk add curl

WORKDIR /app
COPY --from=builder /build/target/release/orim-board-server /app/

ENV HOST "0.0.0.0"
ENV CORS_ALLOW_ORIGIN "http://orimboard.io"
ENV API_BASE_URL "http://api.api.svc.cluster.local/v1/user"

CMD ["./orim-board-server"]
