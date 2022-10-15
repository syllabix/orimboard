import * as React from "react";
import { SVGProps } from "react";

const Info = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M13 8.157a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10 11.907a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v4.25h.75a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1 0-1.5h.75v-3.5h-.75a.75.75 0 0 1-.75-.75Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.657c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11Zm-9.5 11a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
    />
  </svg>
);

export default Info;
