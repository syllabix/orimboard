import * as React from "react";
import { SVGProps } from "react";

const Profile = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 46 46" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x={0.797} y={0.66} width={45} height={45} rx={15} fill="#002B28" />
    <path
      d="M23.298 7.764A8.17 8.17 0 0 1 31.5 15.96c0 4.55-3.649 8.2-8.202 8.2a8.172 8.172 0 0 1-8.202-8.2c0-4.55 3.65-8.197 8.202-8.197Z"
      fill="#418979"
    />
    <path
      d="M23.297 27.982c6.722 0 12.394 1.093 12.394 5.307 0 4.216-5.71 5.27-12.394 5.27-6.72 0-12.395-1.093-12.395-5.307 0-4.216 5.71-5.27 12.395-5.27Z"
      fill="#47A09A"
    />
  </svg>
);

export default Profile;
