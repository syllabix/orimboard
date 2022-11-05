export type WidgetKind = "sticky" | "rect" | "circle" | "star";

export type WidgetData = {
  id: string;
  kind: WidgetKind;
  x: number;
  y: number;
  text?: string;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  draggable: boolean;
};

export type WidgetActions = {
  selected: boolean;
  onSelect: (id: string) => void;
  onChange: (d: WidgetData) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
};
