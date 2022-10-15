import * as React from "react";
import { SVGProps } from "react";

const Circle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.157a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm-11 9.5c0-6.075 4.925-11 11-11s11 4.925 11 11-4.925 11-11 11-11-4.925-11-11Z"
    />
  </svg>
);

export default Circle;
