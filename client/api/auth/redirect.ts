import Router from "next/router";
import { NextPageContext } from "next";

export const redirect = (
  ctx: NextPageContext,
  location: string,
  statusCode?: number
) => {
  const { res } = ctx;
  if (res) {
    res.writeHead(statusCode || 302, {
      Location: location,
    });
    res.end();
  } else {
    Router.push(location);
  }
};
