export type Tool = "pen" | "highlighter" | "brush" | "eraser";

export type Point = {
  x: number;
  y: number;
};

export type UserPositon = {
  id: string;
  point: Point;
  userId: number;
};

export type CursorPositon = {
  id: string;
  point: Point;
  userId: number;
  userName: string;
  color: string;
};

export type LineData = {
  id: string;
  tool: Tool;
  color: string;
  points: Array<number>;
};
