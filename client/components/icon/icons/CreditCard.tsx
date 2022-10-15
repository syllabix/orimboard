import * as React from "react";
import { SVGProps } from "react";

const CreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.25 14.657a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.75 3.657A1.75 1.75 0 0 0 0 5.407v14.5c0 .967.784 1.75 1.75 1.75h20.5a1.75 1.75 0 0 0 1.75-1.75v-14.5a1.75 1.75 0 0 0-1.75-1.75H1.75Zm-.25 1.75a.25.25 0 0 1 .25-.25h20.5a.25.25 0 0 1 .25.25v3.75h-21v-3.75Zm0 5.25v9.25c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25v-9.25h-21Z"
    />
  </svg>
);

export default CreditCard;
