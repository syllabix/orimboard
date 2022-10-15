import * as React from "react";
import { SVGProps } from "react";

const FoldDown = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 19.657a.75.75 0 0 1-.53-.22l-3.25-3.25a.75.75 0 1 1 1.06-1.06l2.72 2.72 2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-.53.22Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 18.657a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5a.75.75 0 0 1-.75.75ZM10.75 6.657a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75ZM2.75 6.657a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75ZM14.75 6.657a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75ZM6.75 6.657a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75ZM18.75 6.657a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75Z"
    />
  </svg>
);

export default FoldDown;
