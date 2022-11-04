import Client, { APIClient } from "api/client";
import { Http } from "api/http";
import { provider } from "api/http/provider";
import { Dispatch, useEffect, useMemo } from "react";
import useSWR from "swr";
import { ChatMessage } from "whiteboard/chat";
import { LineData } from "whiteboard/drawing/line";
import { User } from "whiteboard/user";
import { WidgetData } from "whiteboard/widget";
import { GameServer } from "./useAllocator";

export interface BoardState {
  spaceId: number;
  widgets: Widget[];
  chat: Array<ChatMessage>;
  lines: Array<LineData>;
  users: Array<User>;
}
export interface Widget {
  id: string;
  kind: WidgetKind;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  draggable: boolean;
  text: string;
}

export type WidgetKind = "sticky" | "rect" | "circle" | "star";

export const useBoardStateLoader = (id: string, server: GameServer) => {
  const serverURL = `http://${server.address}:${server.port}/v1/board/${id}`;
  const http = useMemo(() => {
    return new APIClient(new Http(provider(serverURL)));
  }, [serverURL]);
  const { data, error } = useSWR(
    `http://${server.address}:${server.port}/v1/board/${id}`,
    (url) => http.get<BoardState>(url)
  );

  return {
    data: data?.data || {
      widgets: data?.data.widgets || ([] as Array<WidgetData>),
      chat: data?.data.chat || ([] as Array<ChatMessage>),
      lines: data?.data.lines || ([] as Array<LineData>),
      users: data?.data.users || ([] as Array<User>),
    },
    isLoading: !error && !data,
    error: error,
  };
};
