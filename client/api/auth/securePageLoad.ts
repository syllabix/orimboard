import { NextPageContext } from "next";
import { redirect } from "api/auth/redirect";
import AuthManager from "api/auth/manager";
import Client from "api/client";
import { getUser, User } from "api/user";

export type SecurityProps = {
  props: {
    signedUp: boolean;
    user: User | null;
  };
};

// should be used by the getServerSideProps function
// exported by pages that requires authorization
export const securePageLoad = async (
  ctx: NextPageContext
): Promise<SecurityProps> => {
  const { req } = ctx;
  if (req) {
    let result = AuthManager.setAuthFromRequest(req);
    if (result.err) {
      redirect(ctx, "/?status=please+create+username");
      return {
        props: {
          signedUp: false,
          user: null,
        },
      };
    }

    try {
      let user = await getUser(result.val.token);
      return {
        props: {
          signedUp: true,
          user,
        },
      };
    } catch (e) {
      redirect(ctx, "/?status=please+create+username");
      return {
        props: {
          signedUp: false,
          user: null,
        },
      };
    }
  }

  return {
    props: {
      signedUp: false,
      user: null,
    },
  };
};
