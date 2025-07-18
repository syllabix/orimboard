import { useReducer } from "react";
import { LineData, CursorPositon } from "whiteboard/drawing/line";
import { User } from "whiteboard/user";
import { WidgetData } from "whiteboard/widget";
import BoardState, { UserState, WidgetState } from ".";
import { BoardAction } from "./action";

const initialState: BoardState = {
  loading: false,
  connected: false,
  mode: "select",
  activeUser: {} as User,
  chat: [],
  users: {},
  widgets: {},
  userPositions: new Map<number, CursorPositon>,
  lines: [],
};

const reducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case "connect":
      return {
        ...state,
        ...{ connected: action.payload },
      };
    case "chat":
      return {
        ...state,
        ...{
          chat: [...state.chat, action.payload],
        },
      };
    case "join":
      return {
        ...state,
        users: {
          ...state.users,
          ...{ [action.payload.id]: action.payload },
        },
      };
    case "leave":
      const { [action.payload]: user, ...activeUsers } = state.users;
      return {
        ...state,
        users: {
          ...activeUsers,
        },
      };
    case "mode":
      return {
        ...state,
        mode: action.payload,
      };

    case "delete":
      const { [action.payload.id]: widget, ...remaining } = state.widgets;
      return {
        ...state,
        widgets: { ...remaining },
      };

    case "widget":
      return {
        ...state,
        mode: "shape",
        widgets: {
          ...state.widgets,
          ...{ [action.payload.id]: action.payload },
        },
      };

    case "draw":
      switch (action.payload.action) {
        case "start":
          return {
            ...state,
            lines: state.lines.concat({
              id: action.payload.id,
              tool: "pen",
              color: action.payload.color,
              points: [action.payload.point.x, action.payload.point.y],
            }),
          };
        default:
          let lastLine = state.lines[state.lines.length - 1] || {
            points: [],
          };
          lastLine.points = lastLine.points.concat([
            action.payload.point.x,
            action.payload.point.y,
          ]);
          state.lines.splice(state.lines.length - 1, 1, lastLine);
          return {
            ...state,
            lines: state.lines.concat(),
          };
      }

    case "move":
      if (state.activeUser.id != action.payload.userId) {
        let cursorPositon = action.payload as CursorPositon;
        cursorPositon.userName = state.users[action.payload.userId].name;
        cursorPositon.color = state.users[action.payload.userId].color;
        state.userPositions.set(action.payload.userId, cursorPositon);
      }
      return {
        ...state,
      };

    case "setup":
      const widgets = action.payload.widgets.reduce((prev, cur) => {
        return {
          ...prev,
          ...{ [cur.id]: cur },
        };
      }, {} as WidgetState);

      const users = action.payload.users.reduce((prev, cur) => {
        return {
          ...prev,
          ...{ [cur.id]: cur },
        };
      }, {} as UserState);

      return {
        ...state,
        activeUser: action.payload.activeUser,
        chat: action.payload.chat,
        lines: action.payload.lines,
        userPositions: new Map<number, CursorPositon>,
        widgets: {
          ...state.widgets,
          ...widgets,
        },
        users: {
          ...state.users,
          ...users,
        },
      };

    default:
      return state;
  }
};

export const useBoardState = () => useReducer(reducer, initialState);
