import * as React from "react";
import { SVGProps } from "react";

const NorthStar = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.5 1.907a.75.75 0 0 0-1.5 0v8.69L6.447 6.042a.75.75 0 1 0-1.061 1.06l4.553 4.554H1.25a.75.75 0 0 0 0 1.5h8.69L5.385 17.71a.75.75 0 1 0 1.06 1.06L11 14.219v8.689a.75.75 0 0 0 1.5 0v-8.69l4.553 4.554a.75.75 0 0 0 1.061-1.06l-4.553-4.554h8.689a.75.75 0 0 0 0-1.5h-8.69l4.554-4.553a.75.75 0 1 0-1.06-1.061L12.5 10.596V1.907Z" />
  </svg>
);

export default NorthStar;
