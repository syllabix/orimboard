import * as React from "react";
import { SVGProps } from "react";

const Pulse = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.002 3.157a.75.75 0 0 1 .692.464l6.301 15.305 2.56-6.301a.75.75 0 0 1 .695-.468h4a.75.75 0 0 1 0 1.5h-3.495l-3.06 7.532a.75.75 0 0 1-1.389.003L8.997 5.867l-3.054 7.328a.75.75 0 0 1-.692.462H.75a.75.75 0 0 1 0-1.5h4l3.558-8.538a.75.75 0 0 1 .694-.462Z"
    />
  </svg>
);

export default Pulse;
