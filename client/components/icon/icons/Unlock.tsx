import * as React from "react";
import { SVGProps } from "react";

const Unlock = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 7.907c0-2.67 1.922-4.75 4.5-4.75 2.079 0 3.71 1.341 4.282 3.242a.75.75 0 1 0 1.436-.432c-.747-2.485-2.926-4.31-5.718-4.31-3.497 0-6 2.845-6 6.25v1.75h-.5a2.5 2.5 0 0 0-2.5 2.5v8a2.5 2.5 0 0 0 2.5 2.5h13a2.5 2.5 0 0 0 2.5-2.5v-8a2.5 2.5 0 0 0-2.5-2.5h-11v-1.75Zm-3 4.25a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1v-8Z"
    />
  </svg>
);

export default Unlock;
