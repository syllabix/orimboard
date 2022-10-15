import * as React from "react";
import { SVGProps } from "react";

const Hourglass = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.75 2.657a.75.75 0 1 0 0 1.5h.75V7.14a4.75 4.75 0 0 0 2.215 4.017l2.044 1.29a.25.25 0 0 1 0 .423l-2.044 1.29A4.75 4.75 0 0 0 5.5 18.175v2.981h-.75a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5h-.75v-2.981a4.75 4.75 0 0 0-2.215-4.018l-2.044-1.29a.25.25 0 0 1 0-.422l2.044-1.29A4.75 4.75 0 0 0 18.5 7.14V4.157h.75a.75.75 0 0 0 0-1.5H4.75ZM17 4.157H7V7.14a3.25 3.25 0 0 0 1.516 2.748l2.044 1.29a1.75 1.75 0 0 1 0 2.96l-2.044 1.29A3.25 3.25 0 0 0 7 18.176v2.981h10v-2.981a3.25 3.25 0 0 0-1.516-2.749l-2.044-1.29a1.75 1.75 0 0 1 0-2.96l2.044-1.29A3.25 3.25 0 0 0 17 7.14V4.157Z"
    />
  </svg>
);

export default Hourglass;
