import * as React from "react";
import { SVGProps } from "react";

const Briefcase = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#prefix__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 2.407c0-.966.784-1.75 1.75-1.75h5.5c.966 0 1.75.784 1.75 1.75v2.25h4.75c.966 0 1.75.784 1.75 1.75v14.5a1.75 1.75 0 0 1-1.75 1.75H2.75A1.75 1.75 0 0 1 1 20.907v-14.5c0-.966.784-1.75 1.75-1.75H7.5v-2.25Zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25v-8.26a4.233 4.233 0 0 1-2.75 1.01H5.25a4.233 4.233 0 0 1-2.75-1.01Zm19-3.24a2.75 2.75 0 0 1-2.75 2.75H5.25a2.75 2.75 0 0 1-2.75-2.75v-3a.25.25 0 0 1 .25-.25h18.5a.25.25 0 0 1 .25.25v3Zm-6.5-7v2.25H9v-2.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25Z"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" transform="translate(0 .657)" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Briefcase;
