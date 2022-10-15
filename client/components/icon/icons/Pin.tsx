import * as React from "react";
import { SVGProps } from "react";

const Pin = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.886 2.21a1.75 1.75 0 0 1 2.868.604l.634 1.63a5.667 5.667 0 0 0 3.725 3.394l3.959 1.131a1.75 1.75 0 0 1 .756 2.92l-3.767 3.768 5.594 5.595a.75.75 0 0 1-1.06 1.06L15 16.719l-3.768 3.768a1.75 1.75 0 0 1-2.92-.757L7.18 15.77a5.667 5.667 0 0 0-3.395-3.725l-1.63-.633a1.75 1.75 0 0 1-.603-2.869l6.333-6.332Zm6.589 12.912-.005.005-.006.005-4.293 4.293a.25.25 0 0 1-.417-.108l-1.131-3.96a7.167 7.167 0 0 0-4.293-4.71l-1.63-.633a.25.25 0 0 1-.086-.41L8.947 3.27a.25.25 0 0 1 .41.086l.633 1.63A7.166 7.166 0 0 0 14.7 9.28l3.96 1.132a.25.25 0 0 1 .108.417l-4.293 4.293Z"
    />
  </svg>
);

export default Pin;
