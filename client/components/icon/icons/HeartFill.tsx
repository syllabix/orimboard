import * as React from "react";
import { SVGProps } from "react";

const HeartFill = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14 21.065c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 0 1-.686 0 16.709 16.709 0 0 1-.465-.252 31.16 31.16 0 0 1-4.803-3.34C3.8 16.23 1 12.988 1 9.17 1 5.71 3.829 3.158 6.736 3.158c2.294 0 4.145 1.226 5.264 3.105 1.12-1.879 2.97-3.105 5.264-3.105C20.17 3.157 23 5.709 23 9.171c0 3.818-2.801 7.06-5.389 9.262A31.158 31.158 0 0 1 14 21.065Z" />
  </svg>
);

export default HeartFill;
