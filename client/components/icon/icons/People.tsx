import * as React from "react";
import { SVGProps } from "react";

const People = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 8.657a5.5 5.5 0 1 1 8.596 4.547 9.005 9.005 0 0 1 5.9 8.18.75.75 0 1 1-1.5.046 7.5 7.5 0 0 0-14.992 0 .75.75 0 1 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.181A5.494 5.494 0 0 1 3.5 8.657Zm5.5-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
    />
    <path d="M17.29 8.657c-.147 0-.292.01-.433.03a.75.75 0 0 1-.213-1.484 4.53 4.53 0 0 1 3.38 8.097 6.69 6.69 0 0 1 3.956 6.107.75.75 0 0 1-1.5 0 5.192 5.192 0 0 0-3.695-4.972l-.535-.16v-1.676l.41-.208a3.03 3.03 0 0 0-1.37-5.734Z" />
  </svg>
);

export default People;
