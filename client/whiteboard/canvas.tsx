import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';
import { Circle, Layer, Line, Rect, Stage } from 'react-konva';
import { Sketchpad } from 'whiteboard/sketchpad';
import { BoardAction } from 'whiteboard/state/action';
import { WidgetData } from 'whiteboard/widget';
import BoardState from './state';

type Props = {
    state: BoardState,
    dispatch: (msg: BoardAction) => void,
}

export const Canvas: React.FC<Props> = ({ state, dispatch }) => {
    const moveWidget = (update: WidgetData) => {
        dispatch({
            type: "widget",
            payload: update
        })
    }

    return (
        <Sketchpad state={state} dispatch={dispatch}>
            <Layer>
                {Object.values(state.widgets.rect).map(rect => (
                    <Rect draggable
                        key={rect.id}
                        {...rect}
                        onDragMove={e => {
                            moveWidget({
                                ...rect,
                                x: e.target.x(),
                                y: e.target.y(),
                            })
                        }}
                    />
                ))}
                {Object.values(state.widgets.circle).map(circle => (
                    <Circle draggable
                        key={circle.id}
                        {...circle}
                        onDragMove={e => {
                            moveWidget({
                                ...circle,
                                x: e.target.x(),
                                y: e.target.y(),
                            })
                        }}
                    />
                ))}
            </Layer>
        </Sketchpad>
    )
}