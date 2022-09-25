import { Circle, Layer, Rect, Stage } from 'react-konva';
import BoardState from './state';

type Props = {
    state: BoardState
}

export const Canvas: React.FC<Props> = ({ state }) => {
    return (
        <Stage width={window.innerWidth} height={window.innerHeight} className="absolute top-0 left-0 bg-slate-50">
            <Layer>
                <Rect draggable width={50} height={50} x={200} y={200} fill="red" />
                <Circle draggable x={200} y={200} stroke="black" radius={50} />
            </Layer>
        </Stage>
    )
}