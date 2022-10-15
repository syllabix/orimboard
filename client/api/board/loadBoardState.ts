import Client from "api/client";
import { Dispatch, useEffect } from "react";
import { ChatMessage } from "whiteboard/chat";
import { LineData } from "whiteboard/drawing/line";
import { BoardAction } from "whiteboard/state/action";
import { User } from "whiteboard/user";
import { WidgetData } from "whiteboard/widget";

export interface BoardState {
    spaceId: number;
    widgets: Widget[];
    chat: Array<ChatMessage>;
    lines: Array<LineData>
    users: Array<User>
}
export interface Widget {
    id: string;
    kind: WidgetKind;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
    draggable: boolean;
    text: string;
}

export type WidgetKind = "sticky" | "rect" | "circle" | "star";

export const loadBoardState = (id: string, dispatch: Dispatch<BoardAction>) => {
    useEffect(() => {
        if (typeof id === "undefined") return;
        Client.get<BoardState>(`/v1/board/${id}/widgets`)
            .then(res => dispatch({
                type: "setup-state",
                payload: {
                    widgets: res?.data.widgets || [] as Array<WidgetData>,
                    chat: res?.data.chat || [] as Array<ChatMessage>,
                    lines: res?.data.lines || [] as Array<LineData>,
                    users: res?.data.users || [] as Array<User>,
                }
            }))
    }, [id])
}