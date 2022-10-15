import * as React from "react";
import { SVGProps } from "react";

const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.97 11.437a.75.75 0 0 1 0-1.06l6.25-6.25a.75.75 0 0 1 1.06 0l6.25 6.25a.75.75 0 1 1-1.06 1.06l-4.97-4.97v14.44a.75.75 0 0 1-1.5 0V6.467l-4.97 4.97a.75.75 0 0 1-1.06 0Z"
    />
  </svg>
);

export default ArrowUp;
