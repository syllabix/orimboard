import * as React from "react";
import { SVGProps } from "react";

const Bookmark = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 4.407c0-.966.784-1.75 1.75-1.75h10.5c.966 0 1.75.784 1.75 1.75v17.5a.75.75 0 0 1-1.218.586L12 17.868l-5.781 4.625A.75.75 0 0 1 5 21.907v-17.5Zm1.75-.25a.25.25 0 0 0-.25.25v15.94l5.031-4.025a.75.75 0 0 1 .938 0l5.031 4.025V4.407a.25.25 0 0 0-.25-.25H6.75Z"
    />
  </svg>
);

export default Bookmark;
