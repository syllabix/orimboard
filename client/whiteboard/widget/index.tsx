
export type WidgetKind = "sticky" | "rect" | "circle" | "star";

export type WidgetData = {
    id: string;
    kind: WidgetKind;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: string;
    stroke: string;
}