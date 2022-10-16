import { useReducer } from 'react';
import { LineData } from 'whiteboard/drawing/line';
import { WidgetData } from 'whiteboard/widget';
import BoardState, { UserState, WidgetState } from '.';
import { BoardAction } from './action';

const initialState: BoardState = {
    loading: false,
    connecting: false,
    mode: 'select',
    chat: [],
    users: {},
    widgets: {},
    lines: [],
}

const reducer = (state: BoardState, action: BoardAction): BoardState => {
    switch (action.type) {
        case 'connect':
            return {
                ...state,
                ...{ connecting: action.payload },
            }
        case 'chat':
            return {
                ...state,
                ...{
                    chat: [
                        ...state.chat,
                        action.payload
                    ]
                }
            }
        case 'join':
            return {
                ...state,
                users: {
                    ...state.users,
                    ...{ [action.payload.id]: action.payload }
                }
            }
        case 'leave':
            const { [action.payload]: user, ...activeUsers } = state.users;
            return {
                ...state,
                users: {
                    ...activeUsers,
                }
            }
        case 'mode':
            return {
                ...state,
                mode: action.payload
            }

        case 'widget':
            return {
                ...state,
                mode: "shape",
                widgets: {
                    ...state.widgets,
                    ...{ [action.payload.id]: action.payload }
                }
            }

        case 'draw':
            switch (action.payload.action) {
                case "start":
                    return {
                        ...state,
                        lines: state.lines.concat(
                            {
                                id: action.payload.id,
                                tool: "pen",
                                color: action.payload.color,
                                points: [action.payload.point.x, action.payload.point.y]
                            }
                        )
                    }
                default:
                    let lastLine = state.lines[state.lines.length - 1];
                    lastLine.points = lastLine.points.concat([action.payload.point.x, action.payload.point.y]);
                    state.lines.splice(state.lines.length - 1, 1, lastLine);
                    return {
                        ...state,
                        lines: state.lines.concat()
                    }
            }

        case "setup":
            const widgets = action.payload.widgets.reduce((prev, cur) => {
                return {
                    ...prev,
                    ...{ [cur.id]: cur }
                }
            }, {} as WidgetState)

            const users = action.payload.users.reduce((prev, cur) => {
                return {
                    ...prev,
                    ...{ [cur.id]: cur }
                }
            }, {} as UserState)

            return {
                ...state,
                chat: action.payload.chat,
                lines: action.payload.lines,
                widgets: {
                    ...state.widgets,
                    ...widgets
                },
                users: {
                    ...state.users,
                    ...users,
                }
            }

        default:
            return state
    }
}

export const useBoardState = () =>
    useReducer(reducer, initialState);
