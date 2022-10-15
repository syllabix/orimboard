import * as React from "react";
import { SVGProps } from "react";

const StairsMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 46 29" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x={0.57} y={0.555} width={45} height={4} rx={2} fill="#002B28" />
    <rect x={0.57} y={12.555} width={33.75} height={4} rx={2} fill="#002B28" />
    <rect x={0.57} y={24.555} width={22.5} height={4} rx={2} fill="#002B28" />
  </svg>
);

export default StairsMenu;
