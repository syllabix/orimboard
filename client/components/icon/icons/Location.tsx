import * as React from "react";
import { SVGProps } from "react";

const Location = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 14.157a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.071 4.086C15.166.181 8.834.181 4.93 4.086c-3.905 3.905-3.905 10.237 0 14.142l.028.028 5.375 5.375a2.359 2.359 0 0 0 3.336 0l5.403-5.403c3.905-3.905 3.905-10.237 0-14.142ZM5.99 5.146a8.5 8.5 0 0 1 12.02 12.022l-5.403 5.403a.859.859 0 0 1-1.214 0l-5.378-5.378-.002-.002-.023-.023a8.5 8.5 0 0 1 0-12.021Z"
    />
  </svg>
);

export default Location;
