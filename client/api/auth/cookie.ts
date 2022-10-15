import { IncomingHttpHeaders } from "http";
import fromEntries from "object.fromentries";

type Cookies = { [cookieName: string]: string } | null;

export function getCookies(headers: IncomingHttpHeaders): Cookies {
  if (!headers.cookie) {
    return null;
  }
  return fromEntries(
    headers.cookie?.split(/; */).map((c) => {
      const [key, ...v] = c.split("=");
      return [key, decodeURIComponent(v.join("="))];
    })
  );
}
