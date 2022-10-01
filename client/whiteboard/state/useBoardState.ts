import { useReducer } from 'react';
import { LineData } from 'whiteboard/drawing/line';
import BoardState from '.';
import { BoardAction } from './action';

const initialState: BoardState = {
    loading: false,
    connecting: false,
    chat: [],
    users: {},
    widgets: {
        star: {},
        sticky: {},
        circle: {},
        rect: {},
    },
    lines: [],
}

const reducer = (state: BoardState, action: BoardAction): BoardState => {
    // console.log(state);
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
        case 'add-widget': {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    ...{ [action.payload.id]: action.payload }
                }
            }
        }
        case 'widget': {
            const update = {
                ...state.widgets[action.payload.kind],
                ...{ [action.payload.id]: action.payload }
            }
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    ...{ [action.payload.kind]: update }
                }
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


        // const points = (state.lines[action.payload.id] == null) ? [] : state.lines[action.payload.id].points
        // const line: LineData = {
        //     id: action.payload.id,
        //     tool: 'pen',
        //     points: [
        //         ...points,
        //         ...[action.payload.point.x, action.payload.point.y]
        //     ],
        //     color: action.payload.color
        // }
        // const update = {
        //     ...state.lines,
        //     ...{ [action.payload.id]: line }
        // }
        // return {
        //     ...state,
        //     lines: update
        // }
        default:
            return state
    }
}

export const useBoardState = () =>
    useReducer(reducer, initialState);
