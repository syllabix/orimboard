import * as React from "react";
import { SVGProps } from "react";

const ArrowBoth = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.78 6.627a.75.75 0 0 0-1.06 0l-5.25 5.25a.75.75 0 0 0 0 1.06l5.25 5.25a.75.75 0 0 0 1.06-1.06l-3.97-3.97h16.38l-3.97 3.97a.75.75 0 1 0 1.06 1.06l5.25-5.25a.75.75 0 0 0 0-1.06l-5.25-5.25a.75.75 0 1 0-1.06 1.06l3.97 3.97H3.81l3.97-3.97a.75.75 0 0 0 0-1.06Z" />
  </svg>
);

export default ArrowBoth;
