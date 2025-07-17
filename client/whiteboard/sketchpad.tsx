import { KonvaEventObject } from "konva/lib/Node";
import { ReactNode, useRef } from "react";
import { Stage } from "react-konva";
import { BoardAction } from "whiteboard/state/action";
import { useWindowSize } from "whiteboard/hooks/useWindowSize";
import BoardState from "whiteboard/state";
import Konva from "konva";
import { v4 as uuidv4 } from "uuid";

type Props = {
  children: ReactNode;
  state: BoardState;
  dispatch: (msg: BoardAction) => void;
  cursor: string;
  onRelease?: (e: KonvaEventObject<MouseEvent>) => void;
};

export const Sketchpad: React.FC<Props> = ({
  children,
  state,
  dispatch,
  cursor,
  onRelease,
}) => {
  const { width, height } = useWindowSize();
  const drawing = useRef({ active: false, id: "" });

  const getTransformedPointer = (stage: Konva.Stage) => {
    const pointer = stage.getPointerPosition();
    if (!pointer) {
      return null;
    }
    const transform = stage.getAbsoluteTransform().copy();
    transform.invert();
    return transform.point(pointer);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) {
      return;
    }
    const point = getTransformedPointer(stage);
    if (!point) {
      return;
    }

    if (state.mode === "draw" && e.evt.buttons === 1) {
      if (drawing.current.active) {
        dispatch({
          type: "draw",
          payload: {
            id: drawing.current.id,
            point: point,
            color: "#34ebc0",
            action: "stroke",
          },
        });
      }
    } else if (e.evt.buttons !== 1) {
      dispatch({
        type: "move",
        payload: {
          id: uuidv4(),
          point: point,
          userId: state.activeUser.id,
        },
      });
    }
  };

  const handleMouseUp = (e: KonvaEventObject<MouseEvent>) => {
    if (drawing.current.active) {
      const stage = e.target.getStage();
      if (!stage) {
        return;
      }
      const point = getTransformedPointer(stage);
      if (!point) {
        return;
      }
      dispatch({
        type: "draw",
        payload: {
          id: drawing.current.id,
          point: point,
          color: "#34ebc0",
          action: "finish",
        },
      });
      drawing.current.active = false;
      drawing.current.id = "";
    }
    if (onRelease) {
      onRelease(e);
    }
  };

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const stage = e.target.getStage();
    if (!stage) {
      return;
    }

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    if (!pointer) {
      return;
    }

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const scaleBy = 1.05;
    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
    stage.batchDraw();
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    if (!stage) {
      return;
    }
    const newPos = stage.position();
    const scale = stage.scaleX();
  };

  return (
    <Stage
      width={width}
      height={height}
      style={{ cursor: cursor }}
      onMouseDown={(e) => {
        // deselect when clicked on empty area
        if (e.target === e.target.getStage()) {
          if (state.mode === "draw") {
            const stage = e.target.getStage();
            if (!stage) {
              return;
            }
            const point = getTransformedPointer(stage);
            if (!point) {
              return;
            }
            const id = uuidv4();
            drawing.current.active = true;
            drawing.current.id = id;
            dispatch({
              type: "draw",
              payload: {
                id: id,
                point: point,
                color: "#34ebc0",
                action: "start",
              },
            });
          }
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      draggable={state.mode !== "draw"}
      onDragEnd={handleDragEnd}
    >
      {children}
    </Stage>
  );
};
