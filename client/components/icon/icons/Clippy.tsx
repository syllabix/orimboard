import * as React from "react";
import { SVGProps } from "react";

const Clippy = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.962 3.17a.75.75 0 0 1-.475.949l-.816.272a.25.25 0 0 0-.171.237v17.28c0 .137.112.25.25.25h14.5a.25.25 0 0 0 .25-.25V4.627a.25.25 0 0 0-.17-.237l-.817-.272a.75.75 0 0 1 .474-1.423l.816.272A1.75 1.75 0 0 1 21 4.628v17.28a1.75 1.75 0 0 1-1.75 1.75H4.75A1.75 1.75 0 0 1 3 21.907V4.627a1.75 1.75 0 0 1 1.197-1.66l.816-.272a.75.75 0 0 1 .949.474Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2.407c0-.966.784-1.75 1.75-1.75h6.5c.966 0 1.75.784 1.75 1.75v1.5a1.75 1.75 0 0 1-1.75 1.75h-6.5A1.75 1.75 0 0 1 7 3.907v-1.5Zm1.75-.25a.25.25 0 0 0-.25.25v1.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-1.5a.25.25 0 0 0-.25-.25h-6.5Z"
    />
  </svg>
);

export default Clippy;
