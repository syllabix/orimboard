import * as React from "react";
import { SVGProps } from "react";

const StarFill = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.672 1.325a.75.75 0 0 0-1.345 0L8.27 7.522l-6.839.994a.75.75 0 0 0-.415 1.279l4.948 4.823-1.168 6.811a.75.75 0 0 0 1.088.791L12 19.004l6.116 3.216a.75.75 0 0 0 1.089-.79l-1.169-6.812 4.949-4.823a.75.75 0 0 0-.416-1.28l-6.838-.993-3.059-6.197Z"
    />
  </svg>
);

export default StarFill;
