import Button from "components/button";
import { Card } from "components/layout/card";
import { BoardAction } from "whiteboard/state/action";
import { WidgetKind } from "whiteboard/widget";
import { v4 as uuidv4 } from 'uuid';

export type PalletteMode = "select" | "draw" | "shape" | "sticky";

type Props = {
  onUpdate: (msg: BoardAction) => void;
};

const Pallette: React.FC<Props> = ({ onUpdate }) => {
  const addWidget = (kind: WidgetKind) => {
    // TODO: move all this setup to the backend (on widget create)
    onUpdate({
      type: "widget",
      payload: {
        id: uuidv4(),
        kind: kind,
        x: 180,
        y: 350,
        width: kind === "sticky" ? 220 : 150,
        height: kind === "sticky" ? 220 : 150,
        fill: kind === "sticky" ? "#ffff99" : "#fff",
        stroke: kind === "sticky" ? "#ffff99" : "#fff",
        draggable: true,
      },
    });
  };

  return (
    <aside className="fixed left-4 top-1/3 z-10">
      <Card className="flex flex-col space-y-1">
        <Button>Select</Button>
        <Button onClick={() => onUpdate({ type: "mode", payload: "draw" })}>
          Draw
        </Button>
        <Button onClick={() => addWidget("rect")}>Rect</Button>
        <Button onClick={() => addWidget("circle")}>Circle</Button>
        <Button onClick={() => addWidget("star")}>Star</Button>
        <Button onClick={() => addWidget("sticky")}>Sticky</Button>
      </Card>
    </aside>
  );
};

export default Pallette;
