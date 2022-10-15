import * as React from "react";
import { SVGProps } from "react";

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.25 1.657a8.25 8.25 0 1 0 5.28 14.59l5.69 5.69a.75.75 0 0 0 1.06-1.06l-5.69-5.69a8.25 8.25 0 0 0-6.34-13.53ZM2.5 9.907a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0Z"
    />
  </svg>
);

export default Search;
