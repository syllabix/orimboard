import * as React from "react";
import { SVGProps } from "react";

const Clock = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.5 7.907a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 1 0 .744-1.302L12.5 12.972V7.907Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.657c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11Zm-9.5 11a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
    />
  </svg>
);

export default Clock;
