import * as React from "react";
import { SVGProps } from "react";

const Zap = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.168 3.581 4.51 13.718a.25.25 0 0 0 .164.44h5.45a.75.75 0 0 1 .692 1.04l-2.56 6.066 11.216-9.668a.25.25 0 0 0-.164-.439H14a.75.75 0 0 1-.687-1.05l2.855-6.526Zm-.452-1.595a1.34 1.34 0 0 1 2.109 1.55l-2.678 6.121h4.16c1.624 0 2.373 2.016 1.144 3.075L8.1 23.378a1.15 1.15 0 0 1-1.81-1.317l2.705-6.404H4.674c-1.62 0-2.37-2.008-1.148-3.07l12.19-10.6Z"
    />
  </svg>
);

export default Zap;
