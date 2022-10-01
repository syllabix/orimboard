import dynamic from "next/dynamic";
import { Dispatch } from "react";
import BoardState from "./state";
import { BoardAction } from "./state/action";

const CanvasWrapper = dynamic(() => import("./canvas").then(mod => mod.Canvas), {
    ssr: false
});

const Whiteboard: React.FC<{ state: BoardState, dispatch: Dispatch<BoardAction> }> = (props) => (
    <CanvasWrapper {...props} />
)

export default Whiteboard;