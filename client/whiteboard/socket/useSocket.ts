import { Dispatch, MutableRefObject, useEffect, useRef } from "react";
import { BoardAction } from "../state/action";

type Updater = (update: BoardAction) => void

export const useSocket = (id: string, dispatch: Dispatch<BoardAction>): Updater => {
    let ws: MutableRefObject<WebSocket | null> = useRef(null);
    useEffect(() => {
        if (typeof id === "undefined") return;
        ws.current = new WebSocket("ws://localhost:8080/ws/" + id);

        ws.current.onopen = () => {
            dispatch({
                type: 'connect',
                payload: true
            })
            console.log("connection established");
        }

        ws.current.onclose = () => {
            dispatch({
                type: 'connect',
                payload: false
            })
            console.log("connection lost");
        }

        ws.current.onmessage = (evt: MessageEvent) => {
            let data = JSON.parse(evt.data);
            let action = data.action as BoardAction
            dispatch(action);
        }

        const socket = ws.current;

        return () => {
            socket.close();
        };
    }, [id])

    return (update: BoardAction) => {
        if (ws.current) {
            dispatch(update);
            const msg = JSON.stringify(update);
            ws.current.send(msg);
        }
    }
}