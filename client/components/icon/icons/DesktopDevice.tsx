import * as React from "react";
import { SVGProps } from "react";

const DesktopDevice = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.954 17.657H2.75A1.75 1.75 0 0 1 1 15.907v-11.5c0-.966.784-1.75 1.75-1.75h18.5c.966 0 1.75.784 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75h-6.204c.171 1.375.805 2.652 1.769 3.757a.75.75 0 0 1-.565 1.243h-8.5a.75.75 0 0 1-.565-1.243c.964-1.105 1.598-2.382 1.769-3.757ZM21.5 4.407v11.5a.25.25 0 0 1-.25.25H2.75a.25.25 0 0 1-.25-.25v-11.5a.25.25 0 0 1 .25-.25h18.5a.25.25 0 0 1 .25.25Zm-7.963 13.25c.125 1.266.564 2.445 1.223 3.5H9.24c.659-1.055 1.097-2.234 1.223-3.5h3.074Z"
    />
  </svg>
);

export default DesktopDevice;
