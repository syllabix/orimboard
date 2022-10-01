import { KonvaEventObject } from 'konva/lib/Node';
import { ReactNode, useRef } from 'react';
import { Layer, Line, Stage } from 'react-konva';
import { BoardAction } from 'whiteboard/state/action';
import BoardState from './state';

type Props = {
    state: BoardState,
    children: ReactNode,
    cursor?: "default" | "grab" | "grabbing",
    dispatch: (msg: BoardAction) => void,
    onRelease: (e: KonvaEventObject<MouseEvent>) => void,
}

export const Sketchpad: React.FC<Props> = ({ state, cursor = "default", children, dispatch, onRelease }) => {
    const drawing = useRef({
        active: false,
        id: ''
    });

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        if (state.mode !== "draw") return;

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

    const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
        onRelease(e);
        drawing.current = {
            active: false,
            id: "",
        };
    };

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            style={{ cursor }}
            className="absolute top-0 left-0"
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
        >
            {children}

            <Layer>
                {state.lines.map(line => (
                    <Line
                        key={line.id}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={10}
                        tension={0.5}
                        lineCap="round"
                        lineJoin="round"
                        globalCompositeOperation={
                            line.tool === 'eraser' ? 'destination-out' : 'source-over'
                        }
                    />
                ))}
            </Layer>
        </Stage>
    )
}