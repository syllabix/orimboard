import {
  useEffect,
  useRef,
} from "react";
import { Group, Rect, Text, Transformer } from "react-konva";
import { WidgetActions, WidgetData } from "whiteboard/widget";
import { Transformer as ITransformer } from "konva/lib/shapes/Transformer";
import { KonvaEventObject } from "konva/lib/Node";
import { Rect as IRect } from "konva/lib/shapes/Rect";
import { Html } from "react-konva-utils";
import TextareaAutosize from "react-textarea-autosize";
import { BoardAction } from "whiteboard/state/action";

type StickyNoteActions = WidgetActions & {
  dispatch: (action: BoardAction) => void;
};

export const StickyNote: React.FC<WidgetData & StickyNoteActions> = ({
  selected,
  onChange,
  onSelect,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  onMouseDown = () => {},
  onMouseUp = () => {},
  dispatch,
  ...props
}) => {
  const trRef = useRef<ITransformer>(null);
  const paperRef = useRef<IRect>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (selected) {
      if (trRef.current && paperRef.current) {
        trRef.current.nodes([paperRef.current]);
        trRef.current.getLayer()?.batchDraw();
      }
      // For some reason, the text area is not focused on the first click
      // We are using a timeout to wait for the next render
      setTimeout(() => {
        if (!textRef.current) {
          return;
        }
        textRef.current.focus();
        const end = props.text?.length || 0;
        textRef.current.setSelectionRange(end, end);
      }, 0);
    }
  }, [selected]);

  return (
    <Group
      draggable
      x={props.x}
      y={props.y}
      onTap={() => onSelect(props.id)}
      onClick={() => onSelect(props.id)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onDragMove={(e) => {
        onChange({
          ...props,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    >
      <Rect
        x={0}
        y={0}
        ref={paperRef}
        width={props.width}
        height={props.height}
        fill={props.fill}
        shadowOffsetY={20}
        shadowOffsetX={-10}
        shadowBlur={40}
        shadowOpacity={0.2}
        perfectDrawEnabled={false}
        onTransformEnd={(e: KonvaEventObject<Event>) => {
          if (paperRef.current == null) return;
          const node = paperRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...props,
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      <Text
        x={0}
        y={0}
        visible={!selected}
        text={props.text || ""}
        fill="black"
        fontFamily="sans-serif"
        fontSize={24}
        padding={10}
        align={"center"}
        verticalAlign={"middle"}
        width={props.width}
        height={props.height}
        perfectDrawEnabled={false}
      />
      {selected && (
        <Html groupProps={{ x: 0, y: 0 }} divProps={{ style: { opacity: 1 } }}>
          <div
            className="flex items-center justify-center"
            style={{ height: props.height }}
          >
            <TextareaAutosize
              ref={textRef}
              value={props.text}
              style={{
                fontSize: "24px",
                color: "black",
                background: "none",
                width: props.width,
                resize: "none",
                outline: "none",
                textAlign: "center",
                lineHeight: "24px",
                overflowY: "hidden",
                padding: "12px",
              }}
              onKeyDown={(e) => {
                if (
                  (e.key === "Delete" || e.key === "Backspace") &&
                  !props.text
                ) {
                  e.preventDefault();
                  if (textRef.current) {
                    textRef.current.blur();
                  }
                  dispatch({ type: "delete", payload: { id: props.id } });
                }
              }}
              onChange={(e) => {
                onChange({
                  ...props,
                  text: e.target.value,
                });
              }}
            />
          </div>
        </Html>
      )}
      {selected && (
        <Transformer
          ref={trRef}
          keepRatio
          rotateEnabled={false}
          flipEnabled={false}
          enabledAnchors={["bottom-right"]}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </Group>
  );
};
