import * as React from "react";
import { SVGProps } from "react";

const FileMedia = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.25 4.657a.25.25 0 0 0-.25.25v15.5c0 .138.112.25.25.25h3.178L14 11.634a1.75 1.75 0 0 1 2.506-.032L22 17.097V4.907a.25.25 0 0 0-.25-.25H2.25Zm3.496 17.5H21.75a1.75 1.75 0 0 0 1.75-1.75v-15.5a1.75 1.75 0 0 0-1.75-1.75H2.25A1.75 1.75 0 0 0 .5 4.907v15.5c0 .967.784 1.75 1.75 1.75h3.496ZM22 20.407v-1.19l-6.555-6.554a.25.25 0 0 0-.358.005l-7.59 7.99H21.75a.25.25 0 0 0 .25-.25ZM9 9.907a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0Zm1.5 0a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z"
    />
  </svg>
);

export default FileMedia;
