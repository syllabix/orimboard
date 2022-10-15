import * as React from "react";
import { SVGProps } from "react";

const Grabber = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 18.657a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-7 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7-6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-7 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
    />
  </svg>
);

export default Grabber;
