import { useReducer } from 'react';
import BoardState from '.';
import { BoardUpdate } from './action';

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
}

const reducer = (state: BoardState, action: BoardUpdate): BoardState => {
    switch (action.type) {
        case 'connect':
            return {
                ...state,
                ...{ connecting: action.payload },
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
        case 'move-widget': {
            return {
                ...state,
                widgets: {
                    ...state.widgets,
                    ...{ [action.payload.id]: action.payload }
                }
            }
        }
        default:
            return state
    }
}

export const useBoardState = () =>
    useReducer(reducer, initialState);
