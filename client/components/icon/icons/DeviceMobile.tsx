import * as React from "react";
import { SVGProps } from "react";

const DeviceMobile = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10.25 5.907a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75ZM12 20.157a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 3.407c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v18.5a1.75 1.75 0 0 1-1.75 1.75H5.75A1.75 1.75 0 0 1 4 21.907v-18.5Zm1.75-.25a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-18.5a.25.25 0 0 0-.25-.25H5.75Z"
    />
  </svg>
);

export default DeviceMobile;
