import * as React from "react";
import { SVGProps } from "react";

const Dot = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 17.157a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 1.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />
  </svg>
);

export default Dot;
