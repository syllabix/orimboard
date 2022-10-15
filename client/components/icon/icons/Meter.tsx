import * as React from "react";
import { SVGProps } from "react";

const Meter = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.157a9.5 9.5 0 1 0 9.5 9.5c0-1.406-.305-2.74-.852-3.938a.75.75 0 0 1 1.364-.623c.635 1.39.988 2.936.988 4.561 0 6.075-4.925 11-11 11s-11-4.925-11-11 4.925-11 11-11c1.626 0 3.17.353 4.561.988a.75.75 0 1 1-.622 1.364A9.463 9.463 0 0 0 12 3.157Zm9.03.47a.75.75 0 0 1 0 1.06l-6.445 6.446a3 3 0 1 1-1.06-1.06l6.445-6.446a.75.75 0 0 1 1.06 0ZM12 11.157a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    />
  </svg>
);

export default Meter;
