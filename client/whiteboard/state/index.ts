import { PalletteMode } from "components/pallette";
import { LineData } from "whiteboard/drawing/line";
import { ChatMessage } from "../chat";
import { User } from "../user";
import { WidgetData, WidgetKind } from "../widget";

export type WidgetState = { [id: string]: WidgetData; }
export type UserState = { [id: string]: User; }

type BoardState = {
    loading: boolean;
    connecting: boolean;
    mode: PalletteMode;
    activeUser: User;
    users: UserState;
    chat: Array<ChatMessage>;
    widgets: WidgetState;
    lines: Array<LineData>
}

export default BoardState;