import { useState, useEffect, useRef, useReducer, Dispatch } from 'react';

type ChatMessage = {
    userId: number;
    username: string;
    text: string;
};

type WidgetKind = "sticky" | "rect" | "circle" | "star";

type Widget = {
    id: string;
    kind: WidgetKind;
    x: number;
    y: number;
    fill: string;
    stroke: string;
}

type BoardState = {
    loading: boolean;
    chat: Array<ChatMessage>;
    widgets: {
        [kind in WidgetKind]: { [id: string]: Widget; };
    }
}

type ChatUpdate = {
    type: "ChatMessage";
} & ChatMessage

type DrawUpdate = {
    type: "DrawUpdate";
    message: ChatMessage;
}

type WidgetUpdate = {
    type: "WidgetUpdate";
    payload: Widget;
}

type BoardUpdate = ChatUpdate | WidgetUpdate;

const initialState: BoardState = {
    loading: false,
    chat: [],
    widgets: {
        star: {},
        sticky: {},
        circle: {},
        rect: {},
    },
}

type SocketMessage = {
    user_id: number;
    user_name: string;
    space_id: number;
    content: BoardUpdate;
}

const reducer = (state: BoardState, action: BoardUpdate): BoardState => {
    switch (action.type) {
        case 'ChatMessage':
            return {
                loading: state.loading,
                chat: [...state.chat, action],
                widgets: state.widgets,
            }
        case 'WidgetUpdate':
            let update = { [action.payload.id]: action.payload }
            return {
                loading: state.loading,
                chat: state.chat,
                widgets: {
                    ...state.widgets,
                    ...update
                }
            }
    }
}

export const useBoardState = (id?: string): [BoardState, Dispatch<BoardUpdate>] => {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        if (typeof id === "undefined") return;
        let ws = new WebSocket("ws://localhost:8080/ws/" + id);

        ws.onopen = () => {
            console.log("connection established");
        }

        ws.onclose = () => {
            console.log("connection lost");
        }

        ws.onmessage = (evt: MessageEvent) => {
            let msg: SocketMessage = JSON.parse(evt.data);
            console.log(msg);
            switch (msg.content.type) {
                case "ChatMessage":
                    dispatch({
                        type: "ChatMessage",
                        text: msg.content.text,
                        userId: msg.user_id,
                        username: msg.user_name
                    })
                    return;
            }
        }

        return () => {
            ws.close();
        };
    }, [id])

    return [state, dispatch];
};