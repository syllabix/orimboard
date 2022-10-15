import * as React from "react";
import { SVGProps } from "react";

const PaperAirplane = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.513 2.617a1.374 1.374 0 0 1 1.499-.21l19.335 9.216a1.146 1.146 0 0 1 0 2.069L3.012 22.907a1.374 1.374 0 0 1-1.947-1.46l1.425-8.79-1.425-8.79a1.374 1.374 0 0 1 .448-1.25Zm2.375 10.79L2.584 21.45l18.447-8.792L2.584 3.865l1.304 8.042h7.362a.75.75 0 0 1 0 1.5H3.888Z"
    />
  </svg>
);

export default PaperAirplane;
