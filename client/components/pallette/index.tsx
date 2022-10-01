import Button from "components/button";
import { Card } from "components/layout/card";
import { BoardAction } from "whiteboard/state/action";
import { WidgetKind } from "whiteboard/widget";


export type PalletteMode = "select" | "draw" | "shape" | "sticky"

type Props = {
    onUpdate: (msg: BoardAction) => void,
}

const Pallette: React.FC<Props> = ({ onUpdate }) => {

    const addWidget = (kind: WidgetKind) => {
        onUpdate({
            type: "widget",
            payload: {
                id: new Date().getTime().toString(),
                kind: kind,
                x: 100,
                y: 100,
                width: 150,
                height: 150,
                fill: "#fff",
                stroke: "#333"
            }
        })
    }

    return (
        <aside className="fixed left-4 top-1/3 z-10">
            <Card className="flex flex-col space-y-1">
                <Button>Select</Button>
                <Button onClick={() => onUpdate({ type: 'mode', payload: 'draw' })} >Draw</Button>
                <Button onClick={() => addWidget("rect")}>Rect</Button>
                <Button onClick={() => addWidget("circle")}>Circle</Button>
                <Button onClick={() => addWidget("sticky")}>Sticky</Button>
            </Card>
        </aside>
    )
}

export default Pallette;