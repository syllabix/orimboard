import * as React from "react";
import { SVGProps } from "react";

const Beaker = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 9.464V4.157h-.563a.75.75 0 0 1 0-1.5h9.125a.75.75 0 0 1 0 1.5H16v5.307l5.125 9.301c.964 1.75-.302 3.892-2.3 3.892H5.175c-1.998 0-3.263-2.142-2.3-3.892L8 9.465Zm6.5-5.307h-5v5.5a.75.75 0 0 1-.093.362l-2.28 4.138h9.746l-2.28-4.138a.75.75 0 0 1-.093-.362v-5.5ZM4.188 19.49 6.3 15.657h11.4l2.111 3.832c.413.75-.13 1.668-.985 1.668H5.174a1.125 1.125 0 0 1-.986-1.668Z"
    />
  </svg>
);

export default Beaker;
