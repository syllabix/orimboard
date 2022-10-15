import * as React from "react";
import { SVGProps } from "react";

const Milestone = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.75 1.657a.75.75 0 0 1 .75.75v2.25h6.532c.42 0 .826.151 1.143.425l3.187 2.75a1.75 1.75 0 0 1 0 2.65l-3.187 2.75a1.75 1.75 0 0 1-1.143.425H12.5v9.25a.75.75 0 0 1-1.5 0v-9.25H3.75A1.75 1.75 0 0 1 2 11.907v-5.5c0-.966.784-1.75 1.75-1.75H11v-2.25a.75.75 0 0 1 .75-.75Zm0 4.5H19.032a.25.25 0 0 1 .163.061l3.188 2.75a.25.25 0 0 1 0 .379l-3.188 2.75a.25.25 0 0 1-.163.06H3.75a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 1 .25-.25h8Z"
    />
  </svg>
);

export default Milestone;
