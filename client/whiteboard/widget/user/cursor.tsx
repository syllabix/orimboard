import { FC, useEffect, useRef, useState } from "react";
import { Group, Text, Path, Rect } from "react-konva";
import { Text as KonvaText } from "konva/lib/shapes/Text";

type Props = {
    id: string,
    x: number,
    y: number,
    username: string,
    fill?: string,    
}

const Cursor: FC<Props> = ({ x, y, username, fill }) => {
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


    return (
        <Group x={x} y={y} draggable>
            <Path
                data="M0 0 L9 7 L0 12 Z"
                fill={fill ?? "#000000"}
            />
            <Group x={3} y={11}>
                <Rect
                    width={pillWidth}
                    height={PILL_HEIGHT}
                    fill={fill ?? "#000000"}
                    cornerRadius={PILL_HEIGHT/2}
                />
                <Text
                    ref={textRef}
                    text={username}
                    x={PADDING}
                    y={PADDING/2}
                    fontSize={FONT_SIZE}
                    fontFamily={"sans-serif"}
                    fill={"#fff"}
                    verticalAlign="middle"
                />
            </Group>
      </Group>
    );
};

export default Cursor; 