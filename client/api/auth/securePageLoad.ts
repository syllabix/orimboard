import { NextPageContext } from "next";
import { redirect } from "api/auth/redirect";
import AuthManager from "api/auth/manager";

export type PageProps = {
  props: {
    signedUp: boolean;
  };
};

// should be used by the getServerSideProps function
// exported by pages that requires authorization
export const securePageLoad = async (
  ctx: NextPageContext
): Promise<PageProps> => {
  const { req } = ctx;
  if (req) {
    let result = AuthManager.setAuthFromRequest(req);
    if (result.err) {
      redirect(ctx, "/?status=please+create+username");
      return {
        props: {
          signedUp: false,
        },
      };
    }
  }

  return {
    props: {
      signedUp: true,
    },
  };
};
