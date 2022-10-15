import * as React from "react";
import { SVGProps } from "react";

const Mute = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4.407a.75.75 0 0 0-1.255-.555L5.46 8.657H2.75A1.75 1.75 0 0 0 1 10.407v4.5c0 .967.784 1.75 1.75 1.75h2.71l5.285 4.805A.75.75 0 0 0 12 20.907v-16.5ZM6.255 9.962l4.245-3.86v13.11l-4.245-3.86a.75.75 0 0 0-.505-.195h-3a.25.25 0 0 1-.25-.25v-4.5a.25.25 0 0 1 .25-.25h3a.75.75 0 0 0 .505-.195Z"
    />
    <path d="M16.28 8.877a.75.75 0 1 0-1.06 1.06l2.72 2.72-2.72 2.72a.75.75 0 0 0 1.06 1.06l2.72-2.72 2.72 2.72a.75.75 0 0 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06L19 11.597l-2.72-2.72Z" />
  </svg>
);

export default Mute;
