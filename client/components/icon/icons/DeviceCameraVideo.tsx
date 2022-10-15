import * as React from "react";
import { SVGProps } from "react";

const DeviceCameraVideo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 5.907a.75.75 0 0 0-1.136-.643L16.5 9.083V6.907a1.75 1.75 0 0 0-1.75-1.75h-13A1.75 1.75 0 0 0 0 6.907v11c0 .967.784 1.75 1.75 1.75h13a1.75 1.75 0 0 0 1.75-1.75v-2.175l6.364 3.818A.75.75 0 0 0 24 18.907v-13Zm-7.5 8.076 6 3.6V7.232l-6 3.6v3.15ZM15 10.407v-3.5a.25.25 0 0 0-.25-.25h-13a.25.25 0 0 0-.25.25v11c0 .138.112.25.25.25h13a.25.25 0 0 0 .25-.25v-7.5Z"
    />
  </svg>
);

export default DeviceCameraVideo;
