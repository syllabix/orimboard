import * as React from "react";
import { SVGProps } from "react";

const TriangleUp = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="m12.354 9.51 5.793 5.793a.5.5 0 0 1-.354.854H6.207a.5.5 0 0 1-.353-.854l5.792-5.792a.5.5 0 0 1 .708 0Z" />
  </svg>
);

export default TriangleUp;
