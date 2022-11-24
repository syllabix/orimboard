export type Tool = "pen" | "highlighter" | "brush" | "eraser";

export type Point = {
  x: number;
  y: number;
};

export type UserPositon = {
  id: string;
  point: Point;
  userName: string;
};

export type LineData = {
  id: string;
  tool: Tool;
  color: string;
  points: Array<number>;
};
