import * as React from "react";
import { SVGProps } from "react";

const Moon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.499 6.657c0 5.799-4.701 10.5-10.5 10.5-.426 0-.846-.026-1.26-.075A8.5 8.5 0 1 0 16.425 5.398c.05.413.075.833.075 1.259Zm-1.732-2.04A9 9 0 0 1 3.786 15.383a8.935 8.935 0 0 1-.611-.177c-.393-.13-.8.21-.67.602a9.938 9.938 0 0 0 .328.855l.005.01a10.002 10.002 0 0 0 9.161 5.985c5.523 0 10-4.477 10-10 0-4.094-2.46-7.614-5.984-9.16l-.01-.005a9.745 9.745 0 0 0-.855-.328c-.393-.13-.732.276-.603.67a8.937 8.937 0 0 1 .219.779l.001.005Z"
    />
  </svg>
);

export default Moon;
