import Konva from "konva";
import { Group, Path, Text, Rect } from "react-konva";
import { useEffect, useRef, useState } from "react";
import { Text as KonvaText } from "konva/lib/shapes/Text";

type Props = {
  id: number;
  username: string;
  x: number;
  y: number;
  fill: string;
};

export const PointerCursor: React.FC<Props> = ({ id, username, x, y, fill }) => {
  const groupRef = useRef<Konva.Group>(null);
  const textRef = useRef<KonvaText>(null);
  const [pillWidth, setPillWidth] = useState(0);

  const PADDING = 8;
  const FONT_SIZE = 14;
  const PILL_HEIGHT = FONT_SIZE + PADDING;

  useEffect(() => {
    if (textRef.current) {
      setPillWidth(textRef.current.width() + PADDING * 2);
    }
  }, [username]);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const stage = group.getStage();
    if (!stage) return;

    const updateUserCursor = () => {
      const scale = 1 / stage.scaleX();
      group.scale({ x: scale, y: scale });
    };

    stage.on("dragmove", updateUserCursor);
    stage.on("wheel", updateUserCursor);

    updateUserCursor();

    return () => {
      stage.off("dragmove", updateUserCursor);
      stage.off("wheel", updateUserCursor);
    };
  }, [groupRef]);

  return (
    <Group x={x} y={y} ref={groupRef}>
      <Path data="M0 0 L9 7 L0 12 Z" fill={fill ?? "#000000"} />
      <Group x={3} y={11}>
        <Rect
          width={pillWidth}
          height={PILL_HEIGHT}
          fill={fill ?? "#000000"}
          cornerRadius={PILL_HEIGHT / 2}
        />
        <Text
          ref={textRef}
          text={username}
          x={PADDING}
          y={PADDING / 2}
          fontSize={FONT_SIZE}
          fontFamily={"sans-serif"}
          fill={"#fff"}
          verticalAlign="middle"
        />
      </Group>
    </Group>
  );
}; 