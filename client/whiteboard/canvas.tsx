import { KonvaEventObject } from 'konva/lib/Node';
import { useEffect, useRef } from 'react';
import { Circle, Layer, Line, Rect, Stage } from 'react-konva';
import { BoardAction } from 'whiteboard/state/action';
import { WidgetData } from 'whiteboard/widget';
import BoardState from './state';

type Props = {
    state: BoardState,
    dispatch: (msg: BoardAction) => void,
}

export const Canvas: React.FC<Props> = ({ state, dispatch }) => {
    const drawing = useRef({
        active: false,
        id: ''
    });

    const moveWidget = (update: WidgetData) => {
        dispatch({
            type: "widget",
            payload: update
        })
    }

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const pos = e.target.getStage()?.getPointerPosition();
        if (pos == null) return;

        const id = new Date().getTime().toString();

        drawing.current = {
            active: true,
            id
        };

        dispatch({
            type: "draw",
            payload: {
                id: id,
                point: {
                    x: pos.x,
                    y: pos.y,
                },
                color: "#34ebc0",
                action: "start",
            }
        })
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        // no drawing - skipping
        if (!drawing.current.active) {
            return;
        }

        const stage = e.target.getStage();
        const pos = stage?.getPointerPosition();
        if (pos == null) return;

        dispatch({
            type: "draw",
            payload: {
                id: drawing.current.id,
                point: {
                    x: pos.x,
                    y: pos.y,
                },
                color: "#34ebc0",
                action: "stroke",
            }
        })
    };

    const handleMouseUp = () => {
        drawing.current = {
            active: false,
            id: "",
        };
    };

    useEffect(() => {
        console.log(state.lines)
    }, [state.lines])

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            className="absolute top-0 left-0"
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
        >
            <Layer>
                {state.lines.map(line => {
                    <Line
                        key={line.id}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={10}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                        zIndex={99}
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                    />
                })}
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

        </Stage>
    )
}