import * as React from "react";
import { SVGProps } from "react";

const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.75 5.157a.75.75 0 0 1 .75.75v5.75h5.75a.75.75 0 0 1 0 1.5H12.5v5.75a.75.75 0 0 1-1.5 0v-5.75H5.25a.75.75 0 0 1 0-1.5H11v-5.75a.75.75 0 0 1 .75-.75Z"
    />
  </svg>
);

export default Plus;
