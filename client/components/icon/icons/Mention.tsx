import * as React from "react";
import { SVGProps } from "react";

const Mention = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.226 7.908a9.498 9.498 0 1 0-3.477 12.975.75.75 0 1 1 .75 1.299c-5.26 3.037-11.987 1.235-15.024-4.026C-.562 12.896 1.241 6.17 6.501 3.132c5.26-3.037 11.987-1.235 15.024 4.026a10.956 10.956 0 0 1 1.455 4.826c.013.056.02.113.02.173v2.25a3.5 3.5 0 0 1-6.623 1.581 5.5 5.5 0 1 1 1.112-3.682.76.76 0 0 1 .011.129v1.972a2 2 0 0 0 4 0v-1.766a9.452 9.452 0 0 0-1.274-4.733ZM16 12.657a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"
    />
  </svg>
);

export default Mention;
