import * as React from "react";
import { SVGProps } from "react";

const Check = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.03 6.377a.75.75 0 0 1 0 1.06l-11.5 11.5a.75.75 0 0 1-1.072-.012l-5.5-5.75a.75.75 0 1 1 1.084-1.036l4.97 5.195L19.97 6.377a.75.75 0 0 1 1.06 0Z"
    />
  </svg>
);

export default Check;
