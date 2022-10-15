import * as React from "react";
import { SVGProps } from "react";

const Comment = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.25 4.657a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.72-3.72a.75.75 0 0 1 .53-.22h10a.25.25 0 0 0 .25-.25v-12.5a.25.25 0 0 0-.25-.25H3.25Zm-1.75.25c0-.967.784-1.75 1.75-1.75h17.5c.966 0 1.75.783 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.69L7.488 22.73A1.457 1.457 0 0 1 5 21.7v-2.543H3.25a1.75 1.75 0 0 1-1.75-1.75v-12.5Z"
    />
  </svg>
);

export default Comment;
