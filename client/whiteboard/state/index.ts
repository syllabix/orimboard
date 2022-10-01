import { LineData } from "whiteboard/drawing/line";
import { ChatMessage } from "../chat";
import { User } from "../user";
import { WidgetData, WidgetKind } from "../widget";

type BoardState = {
    loading: boolean;
    connecting: boolean;
    users: {
        [id: string]: User,
    }
    chat: Array<ChatMessage>;
    widgets: {
        [kind in WidgetKind]: { [id: string]: WidgetData; };
    },
    lines: {
        [id: string]: LineData,
    }
}

export default BoardState;