# Scaling Orimboard

We integrate with [Agones](https://agones.dev/site/) SDK for autoscaling board server instances in `board` namespace.

## User connecting to new/existing board

When a user would like to connect to a board, the following happens:
1. UI sends a `GET /v1/board/{id}` request to API instance
2. API sends a request to Agones allocator to retrieve the board server instance - or allocate a new one
3. If a new server is allocated, board server is labeled.
4. The server address/port is returned back to client UI
5. Client UI initiates a WS connection with the given address/port. 

Note that step 2 and 3 are executed atomically, therefore the same server instance is used for the same board even in case of concurrent requests.

## Board server constraints

The `BOARD_CAPACITY` env. variable controls how many concurrent boards can run on a given server. By default, board capacity is set to `1` - which is the default scenario for Agones where each game server is ephemeral and not reused. High-density servers scenario could be activated by setting `BOARD_CAPACITY > 1` - although some changes are necessary to full support this case.

Another important aspect of scaling is the `USER_CAPACITY`. Each connected user consumes some resource, since each update has to be replicated to other users. Therfore we can assume that users primarily consume I/O & processing resources whereas boards primarily consume memory.

In future, we can use the labels/annotations to mark board servers that are close to their capacity to avoid having them allocated.

## Board Shutdown

Currently boards are shut down immediately after the last user leaves the server. We will introduce a timeout before a shutdown happens.

Additionally, in high-density servers scenario, shutdowns becomes more complex. It's possible that the same server is allocated more often than the others, blocking shutdown. Therfore we can introduce a max-age for board servers, which could be used to limit the lifetime of board servers.
