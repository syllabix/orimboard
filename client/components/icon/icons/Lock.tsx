import * as React from "react";
import { SVGProps } from "react";

const Lock = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 9.657v-1.75c0-3.405 2.503-6.25 6-6.25s6 2.845 6 6.25v1.75h.5a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-13a2.5 2.5 0 0 1-2.5-2.5v-8a2.5 2.5 0 0 1 2.5-2.5H6Zm1.5-1.75c0-2.67 1.922-4.75 4.5-4.75 2.578 0 4.5 2.08 4.5 4.75v1.75h-9v-1.75Zm-3 4.25a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8Z"
    />
  </svg>
);

export default Lock;
