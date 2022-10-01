import { LineData, Point } from "whiteboard/drawing/line";
import { ChatMessage } from "../chat";
import { User } from "../user";
import { WidgetData } from "../widget";

type Connect = {
    type: 'connect',
    payload: boolean
}

type UserJoin = {
    type: "user-join",
    payload: User
}

type UserLeave = {
    type: "user-leave",
    payload: User
}

type Chat = {
    type: "chat";
    payload: ChatMessage;
}

type AddWidget = {
    type: "add-widget";
    payload: WidgetData;
}

type MoveWidget = {
    type: "widget";
    payload: WidgetData;
}

type Draw = {
    type: "draw";
    payload: {
        id: string,
        point: Point
        color: string,
        action: "start" | "stroke" | "finish"
    }
}

export type BoardAction = Connect | UserJoin | UserLeave | Chat | AddWidget | MoveWidget | Draw;