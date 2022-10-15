import * as React from "react";
import { SVGProps } from "react";

const TriangleDown = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.646 15.803 5.853 10.01a.5.5 0 0 1 .354-.853h11.586a.5.5 0 0 1 .353.854l-5.793 5.792a.5.5 0 0 1-.707 0Z" />
  </svg>
);

export default TriangleDown;
