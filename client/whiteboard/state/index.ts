import { PalletteMode } from "components/pallette";
import { LineData } from "whiteboard/drawing/line";
import { ChatMessage } from "../chat";
import { User } from "../user";
import { WidgetData, WidgetKind } from "../widget";

type BoardState = {
    loading: boolean;
    connecting: boolean;
    mode: PalletteMode;
    users: {
        [id: string]: User,
    }
    chat: Array<ChatMessage>;
    widgets: { [id: string]: WidgetData; };
    lines: Array<LineData>
}

export default BoardState;