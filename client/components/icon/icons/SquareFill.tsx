import * as React from "react";
import { SVGProps } from "react";

const SquareFill = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.75 6.657A1.75 1.75 0 0 0 6 8.407v8.5c0 .966.784 1.75 1.75 1.75h8.5a1.75 1.75 0 0 0 1.75-1.75v-8.5a1.75 1.75 0 0 0-1.75-1.75h-8.5Z" />
  </svg>
);

export default SquareFill;
