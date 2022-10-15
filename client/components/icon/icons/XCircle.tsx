import * as React from "react";
import { SVGProps } from "react";

const XCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9.036 8.633a.75.75 0 1 0-1.06 1.06l2.963 2.964-2.963 2.963a.75.75 0 1 0 1.06 1.06L12 13.718l2.963 2.964a.75.75 0 0 0 1.061-1.06l-2.963-2.964 2.963-2.964a.75.75 0 1 0-1.06-1.06L12 11.596 9.036 8.633Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.657c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11Zm-9.5 11a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0Z"
    />
  </svg>
);

export default XCircle;
