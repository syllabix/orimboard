import * as React from "react";
import { SVGProps } from "react";

const Sun = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#prefix__a)" fillRule="evenodd" clipRule="evenodd">
      <path d="M12 18.157a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM24 12.657a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 .75.75Zm-20 0a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5a.75.75 0 0 1 .75.75ZM20.485 4.172a.75.75 0 0 1 0 1.06L18.717 7a.75.75 0 0 1-1.06-1.06l1.767-1.768a.75.75 0 0 1 1.061 0ZM6.343 18.314a.75.75 0 0 1 0 1.06l-1.768 1.768a.75.75 0 1 1-1.06-1.06l1.767-1.768a.75.75 0 0 1 1.061 0ZM12 .657a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75Zm0 20a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 .75-.75ZM3.515 4.172a.75.75 0 0 1 1.06 0L6.343 5.94A.75.75 0 1 1 5.283 7L3.515 5.232a.75.75 0 0 1 0-1.06Zm14.142 14.142a.75.75 0 0 1 1.06 0l1.768 1.768a.75.75 0 0 1-1.06 1.06l-1.768-1.767a.75.75 0 0 1 0-1.061Z" />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" transform="translate(0 .657)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Sun;
