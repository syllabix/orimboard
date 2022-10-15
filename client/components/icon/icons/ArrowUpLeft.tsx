import * as React from "react";
import { SVGProps } from "react";

const ArrowUpLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.75 16.157a.75.75 0 0 1-.75-.75v-9a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5H7.56l10.22 10.22a.75.75 0 0 1-1.06 1.06L6.5 8.217v7.19a.75.75 0 0 1-.75.75Z"
    />
  </svg>
);

export default ArrowUpLeft;
