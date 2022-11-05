import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { Layer, Line, Rect, Stage } from "react-konva";
import { Sketchpad } from "whiteboard/sketchpad";
import { BoardAction } from "whiteboard/state/action";
import { WidgetData } from "whiteboard/widget";
import { Circle } from "whiteboard/widget/shape/circle";
import { Rectangle } from "whiteboard/widget/shape/rectangle";
import { Star } from "whiteboard/widget/shape/star";
import { StickyNote } from "whiteboard/widget/sticky/stickynote";
import BoardState from "./state";

type Props = {
  state: BoardState;
  dispatch: (msg: BoardAction) => void;
};

type CursorAppearance =
  | "default"
  | "grab"
  | "grabbing"
  | "url('/pencil.svg') 0 30,move";

export const Canvas: React.FC<Props> = ({ state, dispatch }) => {
  const [selectedId, setSelected] = useState<string | null>(null);
  const [hoverstate, setHoverState] = useState<CursorAppearance>("default");

  useEffect(() => {
    if (state.mode === "draw") {
      setHoverState("url('/pencil.svg') 0 30,move");
    } else {
      setHoverState("default");
    }
  }, [state.mode]);

  const handleDeselect = (e: KonvaEventObject<MouseEvent>) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelected(null);
    }
  };

  const moveWidget = (update: WidgetData) => {
    dispatch({
      type: "widget",
      payload: update,
    });
  };

  const setCursorAppearance = (cursor: CursorAppearance) => {
    if (state.mode === "draw") {
      return;
    }
    setHoverState(cursor);
  };

  return (
    <Sketchpad
      cursor={hoverstate}
      state={state}
      dispatch={dispatch}
      onRelease={handleDeselect}
    >
      <Layer>
        {Object.values(state.widgets).map((widget) => {
          switch (widget.kind) {
            case "rect":
              return (
                <Rectangle
                  key={widget.id}
                  selected={selectedId === widget.id}
                  onSelect={setSelected}
                  onMouseEnter={() => setCursorAppearance("grab")}
                  onMouseLeave={() => setCursorAppearance("default")}
                  onMouseUp={() => setCursorAppearance("grab")}
                  onMouseDown={() => setCursorAppearance("grabbing")}
                  {...widget}
                  onChange={(update) => {
                    moveWidget(update);
                  }}
                />
              );
            case "circle":
              return (
                <Circle
                  key={widget.id}
                  selected={selectedId === widget.id}
                  onSelect={setSelected}
                  onMouseEnter={() => setCursorAppearance("grab")}
                  onMouseLeave={() => setCursorAppearance("default")}
                  onMouseUp={() => setCursorAppearance("grab")}
                  onMouseDown={() => setCursorAppearance("grabbing")}
                  {...widget}
                  onChange={(update) => {
                    moveWidget(update);
                  }}
                />
              );
            case "star":
              return (
                <Star
                  key={widget.id}
                  selected={selectedId === widget.id}
                  onSelect={setSelected}
                  onMouseEnter={() => setCursorAppearance("grab")}
                  onMouseLeave={() => setCursorAppearance("default")}
                  onMouseUp={() => setCursorAppearance("grab")}
                  onMouseDown={() => setCursorAppearance("grabbing")}
                  {...widget}
                  onChange={(update) => {
                    moveWidget(update);
                  }}
                />
              );
            case "sticky":
              return (
                <StickyNote
                  key={widget.id}
                  selected={selectedId === widget.id}
                  onSelect={setSelected}
                  onMouseEnter={() => setCursorAppearance("grab")}
                  onMouseLeave={() => setCursorAppearance("default")}
                  onMouseUp={() => setCursorAppearance("grab")}
                  onMouseDown={() => setCursorAppearance("grabbing")}
                  text={widget.text || ""}
                  {...widget}
                  onChange={(update) => {
                    moveWidget(update);
                  }}
                />
              );
          }
        })}
      </Layer>
    </Sketchpad>
  );
};
