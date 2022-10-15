import * as React from "react";
import { SVGProps } from "react";

const CircleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M17.28 9.937a.75.75 0 0 0-1.06-1.06l-5.97 5.97-2.47-2.47a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l6.5-6.5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.657c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11Zm-9.5 11a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
    />
  </svg>
);

export default CircleCheck;
