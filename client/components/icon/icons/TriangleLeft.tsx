import * as React from "react";
import { SVGProps } from "react";

const TriangleLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="m8.854 12.303 5.792-5.793a.5.5 0 0 1 .854.354V18.45a.5.5 0 0 1-.854.353L8.854 13.01a.5.5 0 0 1 0-.707Z" />
  </svg>
);

export default TriangleLeft;
