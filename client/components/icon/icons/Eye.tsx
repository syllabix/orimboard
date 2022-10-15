import * as React from "react";
import { SVGProps } from "react";

const Eye = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M15.5 12.657a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4.157c-3.432 0-6.124 1.535-8.054 3.241C2.02 9.101.815 11.008.33 11.858a1.6 1.6 0 0 0 0 1.598c.485.85 1.69 2.758 3.616 4.46 1.93 1.707 4.622 3.241 8.054 3.241 3.432 0 6.125-1.534 8.054-3.24 1.926-1.703 3.132-3.611 3.617-4.461a1.6 1.6 0 0 0 0-1.598c-.485-.85-1.691-2.757-3.617-4.46-1.93-1.707-4.622-3.24-8.054-3.24ZM1.633 12.602c.441-.774 1.551-2.528 3.307-4.08C6.69 6.972 9.045 5.657 12 5.657c2.955 0 5.309 1.316 7.06 2.865 1.756 1.552 2.866 3.306 3.308 4.08a.11.11 0 0 1 .016.055.11.11 0 0 1-.017.056c-.44.774-1.551 2.528-3.306 4.08-1.752 1.55-4.106 2.864-7.06 2.864-2.956 0-5.31-1.315-7.061-2.864-1.756-1.552-2.866-3.306-3.307-4.08a.111.111 0 0 1-.017-.056.11.11 0 0 1 .017-.055Z"
    />
  </svg>
);

export default Eye;
