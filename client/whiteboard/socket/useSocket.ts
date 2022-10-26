import { Dispatch, MutableRefObject, useEffect, useRef } from "react";
import { BoardAction } from "../state/action";
import getConfig from "next/config";
import { GameServer } from "api/board/useAllocator";
import { User } from "api/user";

type Updater = (update: BoardAction) => void;

const { publicRuntimeConfig } = getConfig();

export const useSocket = (
  id: string,
  server: GameServer,
  user: User,
  dispatch: Dispatch<BoardAction>
): Updater => {
  const ws: MutableRefObject<WebSocket | null> = useRef(null);
  useEffect(() => {
    const serverURL = `ws://${server.address}:${server.port}/v1/board/${id}/connect?tk=${user.id}`;
    ws.current = new WebSocket(serverURL);

    ws.current.onopen = () => {
      dispatch({
        type: "connect",
        payload: true,
      });
      console.log("connection established");
    };

    ws.current.onclose = () => {
      dispatch({
        type: "connect",
        payload: false,
      });
      console.log("connection lost");
    };

    ws.current.onmessage = (evt: MessageEvent) => {
      let data = JSON.parse(evt.data);
      let action = data.action as BoardAction;
      dispatch(action);
    };

    const socket = ws.current;

    return () => {
      if (socket.readyState === socket.OPEN) {
        socket.close();
      }
    };
  }, [id]);

  return (update: BoardAction) => {
    if (ws.current) {
      dispatch(update);
      const msg = JSON.stringify(update);
      ws.current.send(msg);
    }
  };
};
