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
    type: "move-widget";
    payload: WidgetData;
}

export type BoardUpdate = Connect | UserJoin | UserLeave | Chat | AddWidget | MoveWidget;