import dynamic from "next/dynamic";
import { Dispatch } from "react";
import BoardState from "./state";
import { BoardUpdate } from "./state/action";

const CanvasWrapper = dynamic(() => import("./canvas").then(mod => mod.Canvas), {
    ssr: false
});

const Whiteboard: React.FC<{ state: BoardState, dispatch: Dispatch<BoardUpdate> }> = ({ state }) => (
    <CanvasWrapper state={state} />
)

export default Whiteboard;