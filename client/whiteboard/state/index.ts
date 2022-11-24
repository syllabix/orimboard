import { PalletteMode } from "components/pallette";
import { LineData, Point, UserPositon } from "whiteboard/drawing/line";
import { ChatMessage } from "../chat";
import { User } from "../user";
import { WidgetData, WidgetKind } from "../widget";

export type WidgetState = { [id: string]: WidgetData };
export type UserState = { [id: string]: User };

type BoardState = {
  loading: boolean;
  connected: boolean;
  mode: PalletteMode;
  activeUser: User;
  users: UserState;
  chat: Array<ChatMessage>;
  widgets: WidgetState;
  userPositions: Map<string, UserPositon>;
  lines: Array<LineData>;
};

export default BoardState;
