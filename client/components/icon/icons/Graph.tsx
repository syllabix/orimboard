import * as React from "react";
import { SVGProps } from "react";

const Graph = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 3.407a.75.75 0 1 0-1.5 0v18.5c0 .414.336.75.75.75H20a.75.75 0 0 0 0-1.5H2.5V3.407Z" />
    <path d="M22.28 8.438a.75.75 0 0 0-1.06-1.061l-5.72 5.72-3.72-3.72a.75.75 0 0 0-1.06 0l-6 6a.75.75 0 0 0 1.06 1.06l5.47-5.47 3.72 3.72a.75.75 0 0 0 1.06 0l6.25-6.25Z" />
  </svg>
);

export default Graph;
