import * as React from "react";
import { SVGProps } from "react";

const Vector = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 19 11" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1.139 1.17 9.15 9.207l8.011-8.037"
      stroke="#7D7F7F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Vector;
