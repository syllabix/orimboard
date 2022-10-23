import * as React from "react";
import { SVGProps } from "react";

const History = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.998 3.157a9.503 9.503 0 0 0-8.62 5.5H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1v-3.75a.75.75 0 0 1 1.5 0v1.697a10.997 10.997 0 0 1 9.498-5.447c6.076 0 11.002 4.925 11.002 11s-4.926 11-11.002 11C6.014 23.657 1.146 18.88 1 12.932a.75.75 0 1 1 1.5-.037c.126 5.136 4.33 9.262 9.498 9.262 5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5Z" />
    <path d="M12.5 7.907a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.972V7.907Z" />
  </svg>
);

export default History;