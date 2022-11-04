import Client from "api/client";
import useSWR from "swr";

export interface GameServer {
  gameServerName: string;
  port: number;
  address: string;
}

export const useAllocator = (id: string) => {
  const { data, error } = useSWR(`/v1/board/${id}`, (url) =>
    Client.get<GameServer>(url)
  );

  return {
    server: data?.data || ({} as never as GameServer),
    isLoading: !error && !data,
    error: error,
  };
};
