import Cookies, { CookieAttributes } from "js-cookie";
import { IncomingMessage } from "http";
import { Ok, Err, Result } from "ts-results";

import { getCookies } from "api/auth/cookie";

type SessionData = {
  token: string;
};

const session = "token";

// Manager is used for handling session data
export class Manager {
  private session: SessionData;
  private onServer: boolean;
  private options: CookieAttributes = {};

  constructor(onServer: boolean) {
    this.onServer = onServer;
    this.session = { token: "" };
    this.options = {
      path: "/",
      expires: 0.5,
      sameSite: "Lax",
      HttpOnly: false,
    };
  }

  setToken = (token: string) => {
    if (this.onServer) {
      this.session.token = token;
      return;
    }
    Cookies.set(session, token, this.options);
  };

  getToken = (): string | undefined => {
    if (this.onServer) {
      return this.session.token;
    }
    return Cookies.get(session);
  };

  setAuthFromRequest = (req: IncomingMessage): Result<SessionData, Error> => {
    const cookies = getCookies(req.headers);
    if (!cookies) {
      return new Err(new Error("session data not present"));
    }

    const token = cookies[session];
    if (token) {
      this.session = {
        token: token,
      };
      this.setToken(token);
      return Ok(this.session);
    }

    return new Err(new Error("session data not present"));
  };

  logout = () => {
    if (this.onServer) {
      this.session = { token: "" };
      return;
    }

    Cookies.remove(session);
  };
}

const AuthManager = new Manager(typeof window === "undefined");

export default AuthManager;
