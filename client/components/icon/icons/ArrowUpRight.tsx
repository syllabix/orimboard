import * as React from "react";
import { SVGProps } from "react";

const ArrowUpRight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.25 16.157a.75.75 0 0 0 .75-.75v-9a.75.75 0 0 0-.75-.75h-9a.75.75 0 0 0 0 1.5h7.19L6.22 17.377a.75.75 0 0 0 1.06 1.06L17.5 8.217v7.19c0 .414.336.75.75.75Z"
    />
  </svg>
);

export default ArrowUpRight;
