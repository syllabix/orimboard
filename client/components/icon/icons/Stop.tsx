import * as React from "react";
import { SVGProps } from "react";

const Stop = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 7.657a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75ZM12 17.657a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.328 2.127a.75.75 0 0 1 .53-.22h8.284a.75.75 0 0 1 .53.22l5.858 5.858c.141.14.22.33.22.53v8.284a.75.75 0 0 1-.22.53l-5.858 5.858a.75.75 0 0 1-.53.22H7.858a.75.75 0 0 1-.53-.22L1.47 17.33a.75.75 0 0 1-.22-.53V8.515a.75.75 0 0 1 .22-.53l5.858-5.858Zm.84 1.28L2.75 8.826v7.662l5.419 5.419h7.662l5.419-5.419V8.826l-5.418-5.419H8.168Z"
    />
  </svg>
);

export default Stop;
