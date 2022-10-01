import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef, useState } from 'react';
import { Layer, Line, Rect, Stage } from 'react-konva';
import { Sketchpad } from 'whiteboard/sketchpad';
import { BoardAction } from 'whiteboard/state/action';
import { WidgetData } from 'whiteboard/widget';
import { Circle } from 'whiteboard/widget/shape/circle';
import { Rectangle } from 'whiteboard/widget/shape/rectangle';
import { Star } from 'whiteboard/widget/shape/star';
import { StickyNote } from 'whiteboard/widget/sticky/stickynote';
import BoardState from './state';

type Props = {
    state: BoardState,
    dispatch: (msg: BoardAction) => void,
}

export const Canvas: React.FC<Props> = ({ state, dispatch }) => {
    const [selectedId, setSelected] = useState<string | null>(null);
    const [hoverstate, setHoverState] = useState<"default" | "grab" | "grabbing">("default");

    const handleDeselect = (e: KonvaEventObject<MouseEvent>) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelected(null);
        }
    }

    const moveWidget = (update: WidgetData) => {
        dispatch({
            type: "widget",
            payload: update
        })
    }

    return (
        <Sketchpad cursor={hoverstate} state={state} dispatch={dispatch} onRelease={handleDeselect}>
            <Layer>
                {Object.values(state.widgets).map(widget => {
                    switch (widget.kind) {
                        case 'rect':
                            return <Rectangle
                                key={widget.id}
                                selected={selectedId === widget.id}
                                onSelect={setSelected}
                                {...widget}
                                onChange={update => {
                                    moveWidget(update)
                                }}
                            />
                        case 'circle':
                            return <Circle
                                key={widget.id}
                                selected={selectedId === widget.id}
                                onSelect={setSelected}
                                {...widget}
                                onChange={update => {
                                    moveWidget(update)
                                }}
                            />
                        case 'star':
                            return <Star
                                key={widget.id}
                                selected={selectedId === widget.id}
                                onSelect={setSelected}
                                {...widget}
                                onChange={update => {
                                    moveWidget(update)
                                }}
                            />
                        case 'sticky':
                            return <StickyNote
                                key={widget.id}
                                selected={selectedId === widget.id}
                                onSelect={setSelected}
                                onMouseEnter={() => setHoverState("grab")}
                                onMouseLeave={() => setHoverState("default")}
                                onMouseUp={() => setHoverState("grab")}
                                onMouseDown={() => setHoverState("grabbing")}
                                text={widget.text || ''}
                                {...widget}
                                onChange={update => {
                                    moveWidget(update)
                                }}
                            />
                    }
                })}
            </Layer>
        </Sketchpad>
    )
}