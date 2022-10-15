import * as React from "react";
import { SVGProps } from "react";

const X = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.72 6.377a.75.75 0 0 1 1.06 0l5.22 5.22 5.22-5.22a.75.75 0 1 1 1.06 1.06l-5.22 5.22 5.22 5.22a.75.75 0 1 1-1.06 1.06L12 13.717l-5.22 5.22a.75.75 0 0 1-1.06-1.06l5.22-5.22-5.22-5.22a.75.75 0 0 1 0-1.06Z"
    />
  </svg>
);

export default X;
