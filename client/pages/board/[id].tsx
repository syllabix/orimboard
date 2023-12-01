import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import { useBoardState } from "../../whiteboard/state/useBoardState";
import Whiteboard from "../../whiteboard";
import { useSocket } from "../../whiteboard/socket/useSocket";
import { BoardNav } from "../../components/navigation/board-nav";
import { Messenger } from "../../components/chat/messenger";
import Pallette from "components/pallette";
import { securePageLoad } from "api/auth/securePageLoad";
import { User } from "api/user";
import { GameServer } from "api/board/useAllocator";
import Client from "api/client";
import { BoardStateLoader } from "whiteboard/state/loader";
import { Logo, NavLogo } from "components/brand/logo";

type Props = {
  id: string;
  user: User;
  server: GameServer;
};

const WhiteboardPage: NextPage<Props> = ({ id, user, server }) => {
  const [state, dispatch] = useBoardState();
  const updater = useSocket(id, server, user, dispatch);

  return (
    <>
      <Head>
        <title>orim | simple collaboration</title>
        <meta name="description" content="a lean mean collaboration app" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <BoardNav boardname="My Awesome Board" />
      {!state.connected && (
        <div className="flex flex-col justify-center items-center h-full">
          <div className="bg-slate-600 shadow-lg rounded-md px-4 py-2 flex content-center mt-64">
            <div className="flex">
              <Logo />
              <p className="text-xs text-center ml-2 mt-2">connecting...</p>
            </div>
          </div>
        </div>
      )}
      {state.connected && (
        <>
          <BoardStateLoader
            id={id}
            user={user}
            server={server}
            dispatch={dispatch}
          />
          <Pallette onUpdate={updater} />
          <Messenger
            user={state.activeUser}
            users={state.users}
            messages={state.chat}
            send={updater}
          />
          <Whiteboard state={state} dispatch={updater} />
        </>
      )}
    </>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const { id } = ctx.query as { id: string };
  let result = await securePageLoad(ctx);
  let server = await Client.get<GameServer>(`/v1/board/${id}`);
  return {
    props: {
      id,
      user: result.props.user,
      server: server.data,
    },
  };
}

export default WhiteboardPage;
