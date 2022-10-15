import * as React from "react";
import { SVGProps } from "react";

const DotFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={12} cy={12.657} r={6} />
  </svg>
);

export default DotFilled;
