import { useBoardStateLoader } from "api/board/loadBoardState";
import { GameServer } from "api/board/useAllocator";
import { User } from "api/user";
import { Dispatch, useEffect } from "react";
import { BoardAction } from "whiteboard/state/action";

type Props = {
  id: string;
  user: User;
  server: GameServer;
  dispatch: Dispatch<BoardAction>;
};

export const BoardStateLoader: React.FC<Props> = ({
  id,
  user,
  server,
  dispatch,
}) => {
  const { data, isLoading } = useBoardStateLoader(id, server);

  useEffect(() => {
    dispatch({
      type: "setup",
      payload: {
        activeUser: user,
        widgets: data.widgets,
        chat: data.chat,
        lines: data.lines,
        users: data.users,
      },
    });
  }, [data]);

  return <></>;
};
