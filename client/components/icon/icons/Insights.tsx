import * as React from "react";
import { SVGProps } from "react";

const Insights = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.75 4.157a.75.75 0 0 1 .75.75v15.5a.75.75 0 0 1-1.5 0v-15.5a.75.75 0 0 1 .75-.75Zm6.5 3.625a.75.75 0 0 1 .75.75v11.875a.75.75 0 0 1-1.5 0V8.532a.75.75 0 0 1 .75-.75Zm-13 3.875a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-1.5 0v-8a.75.75 0 0 1 .75-.75Z"
    />
  </svg>
);

export default Insights;
