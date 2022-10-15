import * as React from "react";
import { SVGProps } from "react";

const Stopwatch = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.25.657a.75.75 0 0 0 0 1.5h1v1.278A9.955 9.955 0 0 0 5.615 5.71L4.28 4.377a.75.75 0 1 0-1.06 1.06l1.315 1.316A9.963 9.963 0 0 0 2 13.407c0 5.523 4.477 10 10 10s10-4.477 10-10a9.962 9.962 0 0 0-2.535-6.654l1.315-1.315a.75.75 0 0 0-1.06-1.061L18.386 5.71a9.955 9.955 0 0 0-5.636-2.276V2.157h1a.75.75 0 0 0 0-1.5h-3.5ZM12 21.907a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Zm4.03-12.53a.75.75 0 0 1 0 1.06L13.65 12.82a1.75 1.75 0 1 1-1.06-1.06l2.38-2.382a.75.75 0 0 1 1.061 0Z"
    />
  </svg>
);

export default Stopwatch;
