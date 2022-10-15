import * as React from "react";
import { SVGProps } from "react";

const Filter = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.75 6.657a.75.75 0 0 0 0 1.5h18.5a.75.75 0 0 0 0-1.5H2.75ZM6 12.407a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM10 17.345a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
  </svg>
);

export default Filter;
