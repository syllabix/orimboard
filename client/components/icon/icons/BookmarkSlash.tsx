import * as React from "react";
import { SVGProps } from "react";

const BookmarkSlash = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.565 2.675a.75.75 0 0 0-.88 1.215L5 7.014v14.902a.75.75 0 0 0 1.22.585L12 17.868l5.781 4.633a.75.75 0 0 0 1.22-.585v-4.764l3.434 2.488a.75.75 0 0 0 .88-1.215L1.565 2.675ZM17.5 16.066 6.5 8.1v12.254l5.031-4.032a.75.75 0 0 1 .938 0l5.031 4.032v-4.288Z"
    />
    <path d="M7.25 2.657a.75.75 0 1 0 0 1.5h10a.25.25 0 0 1 .25.25v6.5a.75.75 0 1 0 1.5 0v-6.5a1.75 1.75 0 0 0-1.75-1.75h-10Z" />
  </svg>
);

export default BookmarkSlash;
