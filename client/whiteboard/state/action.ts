import { PalletteMode } from "components/pallette";
import { LineData, Point, UserPositon } from "whiteboard/drawing/line";
import { ChatMessage } from "../chat";
import { User } from "../user";
import { WidgetData } from "../widget";

type Connect = {
  type: "connect";
  payload: boolean;
};

type UserJoin = {
  type: "join";
  payload: User;
};

type UserLeave = {
  type: "leave";
  payload: number;
};

type Chat = {
  type: "chat";
  payload: ChatMessage;
};

type AddWidget = {
  type: "add-widget";
  payload: WidgetData;
};

type SetupState = {
  type: "setup";
  payload: {
    activeUser: User;
    widgets: Array<WidgetData>;
    chat: Array<ChatMessage>;
    lines: Array<LineData>;
    users: Array<User>;
  };
};

type MoveWidget = {
  type: "widget";
  payload: WidgetData;
};

type Draw = {
  type: "draw";
  payload: {
    id: string;
    point: Point;
    color: string;
    action: "start" | "stroke" | "finish";
  };
};

type Move = {
  type: "move";
  payload: UserPositon;
};

type ToggleMode = {
  type: "mode";
  payload: PalletteMode;
};

type DeleteWidget = {
  type: "delete";
  payload: {
    id: string;
  };
};

export type BoardAction =
  | Connect
  | UserJoin
  | UserLeave
  | Chat
  | AddWidget
  | MoveWidget
  | Draw
  | Move
  | SetupState
  | DeleteWidget
  | ToggleMode;
