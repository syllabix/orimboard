import * as React from "react";
import { SVGProps } from "react";

const Report = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 6.657a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75ZM12 15.657a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.5 4.907c0-.967.784-1.75 1.75-1.75h17.5c.966 0 1.75.783 1.75 1.75v12.5a1.75 1.75 0 0 1-1.75 1.75h-9.586a.25.25 0 0 0-.177.073l-3.5 3.5A1.457 1.457 0 0 1 5 21.7v-2.543H3.25a1.75 1.75 0 0 1-1.75-1.75v-12.5Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.427-3.428a1.75 1.75 0 0 1 1.237-.512h9.586a.25.25 0 0 0 .25-.25v-12.5a.25.25 0 0 0-.25-.25H3.25Z"
    />
  </svg>
);

export default Report;
