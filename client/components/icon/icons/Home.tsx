import * as React from "react";
import { SVGProps } from "react";

const Home = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.03 3.247a1.5 1.5 0 0 1 1.94 0l7.5 6.364a1.5 1.5 0 0 1 .53 1.143v9.403a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75v-6.25h-2v6.25a.75.75 0 0 1-.75.75H4.5a1.5 1.5 0 0 1-1.5-1.5v-9.403c0-.44.194-.858.53-1.143l7.5-6.364ZM12 4.391l-7.5 6.363v9.403h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403L12 4.391Z"
    />
  </svg>
);

export default Home;
