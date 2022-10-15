import * as React from "react";
import { SVGProps } from "react";

const Person = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.157a5.5 5.5 0 0 0-3.096 10.047 9.005 9.005 0 0 0-5.9 8.18.75.75 0 1 0 1.5.046 7.5 7.5 0 0 1 14.993 0 .75.75 0 1 0 1.5-.045 9.005 9.005 0 0 0-5.9-8.181A5.5 5.5 0 0 0 12 3.157Zm-4 5.5a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
    />
  </svg>
);

export default Person;
