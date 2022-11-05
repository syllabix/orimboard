export type Tool = "pen" | "highlighter" | "brush" | "eraser";

export type Point = {
  x: number;
  y: number;
};

export type LineData = {
  id: string;
  tool: Tool;
  color: string;
  points: Array<number>;
};
