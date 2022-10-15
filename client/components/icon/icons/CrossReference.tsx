import * as React from "react";
import { SVGProps } from "react";

const CrossReference = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M16.5 2.907a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-3.69l-6.22 6.22a.75.75 0 1 1-1.06-1.06l6.22-6.22h-3.69a.75.75 0 0 1-.75-.75Z" />
    <path d="M3.25 4.657a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 .75.75v3.19l3.72-3.72a.75.75 0 0 1 .53-.22h10a.25.25 0 0 0 .25-.25v-6a.75.75 0 0 1 1.5 0v6a1.75 1.75 0 0 1-1.75 1.75h-9.69L7.488 22.73A1.457 1.457 0 0 1 5 21.7v-2.543H3.25a1.75 1.75 0 0 1-1.75-1.75v-12.5c0-.967.784-1.75 1.75-1.75h11a.75.75 0 0 1 0 1.5h-11Z" />
  </svg>
);

export default CrossReference;
