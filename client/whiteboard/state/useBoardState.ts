import { useReducer } from 'react';
import { LineData } from 'whiteboard/drawing/line';
import BoardState from '.';
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
        case 'user-join':
            return {
                ...state,
                users: {
                    ...state.users,
                    ...{ [action.payload.id]: action.payload }
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

        default:
            return state
    }
}

export const useBoardState = () =>
    useReducer(reducer, initialState);
