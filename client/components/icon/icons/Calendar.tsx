import * as React from "react";
import { SVGProps } from "react";

const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 27 27" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect
      x={2.492}
      y={3.547}
      width={21.077}
      height={21.077}
      rx={3}
      stroke="#002B28"
    />
    <path
      d="M18.78 1.634v3.832M7.283 1.634v3.832M2.494 9.297h21.074M8.72 14.087h3.353l-1.915 2.395a1.917 1.917 0 1 1-1.353 3.268M14.945 15.524l1.916-1.437v6.226"
      stroke="#002B28"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Calendar;
