import * as React from "react";
import { SVGProps } from "react";

const Mail = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.75 3.657A1.75 1.75 0 0 0 0 5.407v14c0 .967.784 1.75 1.75 1.75h20.5a1.75 1.75 0 0 0 1.75-1.75v-14a1.75 1.75 0 0 0-1.75-1.75H1.75Zm-.25 1.75a.25.25 0 0 1 .25-.25h20.5a.25.25 0 0 1 .25.25v.852l-10.36 7a.25.25 0 0 1-.28 0l-10.36-7v-.852Zm0 2.662v11.338c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V8.07l-9.52 6.433c-.592.4-1.368.4-1.96 0L1.5 8.069Z"
    />
  </svg>
);

export default Mail;
