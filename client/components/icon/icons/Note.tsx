import * as React from "react";
import { SVGProps } from "react";

const Note = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 5.407c0-.966.784-1.75 1.75-1.75h20.5c.966 0 1.75.784 1.75 1.75v14.5a1.75 1.75 0 0 1-1.75 1.75H1.75A1.75 1.75 0 0 1 0 19.907v-14.5Zm1.75-.25a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25v-14.5a.25.25 0 0 0-.25-.25H1.75Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 9.407a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 0 1.5H5.75a.75.75 0 0 1-.75-.75ZM5 13.407a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75Z"
    />
  </svg>
);

export default Note;
