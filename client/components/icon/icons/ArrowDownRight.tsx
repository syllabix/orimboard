import * as React from "react";
import { SVGProps } from "react";

const ArrowDownRight = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.25 9.157a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1 0-1.5h7.19L6.22 7.937a.75.75 0 0 1 1.06-1.06l10.22 10.22v-7.19a.75.75 0 0 1 .75-.75Z"
    />
  </svg>
);

export default ArrowDownRight;
