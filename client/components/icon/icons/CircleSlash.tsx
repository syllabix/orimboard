import * as React from "react";
import { SVGProps } from "react";

const CircleSlash = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.657c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11Zm-9.5 11a9.5 9.5 0 0 1 9.5-9.5c2.353 0 4.507.856 6.166 2.273L4.773 18.823A9.462 9.462 0 0 1 2.5 12.657Zm3.334 7.227A9.462 9.462 0 0 0 12 22.157a9.5 9.5 0 0 0 9.5-9.5 9.462 9.462 0 0 0-2.273-6.166L5.834 19.884Z"
    />
  </svg>
);

export default CircleSlash;
