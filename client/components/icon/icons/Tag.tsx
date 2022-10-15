import * as React from "react";
import { SVGProps } from "react";

const Tag = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7.75 7.157a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.5 1.657a1.5 1.5 0 0 0-1.5 1.5v8.44c0 .397.158.779.44 1.06l10.25 10.25a1.5 1.5 0 0 0 2.12 0l8.44-8.44a1.5 1.5 0 0 0 0-2.12L12 2.097a1.5 1.5 0 0 0-1.06-.44H2.5Zm0 1.5h8.44l10.25 10.25-8.44 8.44L2.5 11.597v-8.44Z"
    />
  </svg>
);

export default Tag;
