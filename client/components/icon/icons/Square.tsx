import * as React from "react";
import { SVGProps } from "react";

const Square = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 8.407c0-.967.784-1.75 1.75-1.75h8.5c.966 0 1.75.783 1.75 1.75v8.5a1.75 1.75 0 0 1-1.75 1.75h-8.5A1.75 1.75 0 0 1 6 16.907v-8.5Zm1.75-.25a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-8.5a.25.25 0 0 0-.25-.25h-8.5Z"
    />
  </svg>
);

export default Square;
