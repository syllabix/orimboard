import { Dispatch, useEffect } from "react";
import { BoardUpdate } from "../state/action";

type Updater = (update: BoardUpdate) => void

export const useSocket = (id: string, dispatch: Dispatch<BoardUpdate>): Updater => {
    let ws: WebSocket;
    useEffect(() => {
        if (typeof id === "undefined") return;
        ws = new WebSocket("ws://localhost:8080/ws/" + id);

        ws.onopen = () => {
            dispatch({
                type: 'connect',
                payload: true
            })
            console.log("connection established");
        }

        ws.onclose = () => {
            dispatch({
                type: 'connect',
                payload: false
            })
            console.log("connection lost");
        }

        ws.onmessage = (evt: MessageEvent) => {
            let msg: BoardUpdate = JSON.parse(evt.data);
            console.log(msg);
            dispatch(msg);
        }

        return () => {
            ws.close();
        };
    }, [id])

    return (update: BoardUpdate) => {
        dispatch(update);
        if (ws) {
            const msg = JSON.stringify(update);
            ws.send(msg);
        }
    }
}