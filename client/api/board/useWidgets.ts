import Client from "api/client";
import { Dispatch, useEffect } from "react";
import useSWR from "swr";
import { BoardAction } from "whiteboard/state/action";

export interface WidgetState {
    spaceId: number;
    widgets: Widget[];
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

export const loadWidgets = (id: string, dispatch: Dispatch<BoardAction>) => {
    useEffect(() => {
        if (typeof id === "undefined") return;
        Client.get<WidgetState>(`/v1/board/${id}/widgets`)
            .then(res => dispatch({
                type: "add-widgets",
                payload: res?.data.widgets || []
            }))
    }, [id])
}

export const useWidgets = (space_id: string) => {
    const { data, error } = useSWR(`/v1/board/${space_id}/widgets`, url =>
        Client.get<WidgetState>(url)
    );

    return {
        data: data?.data || ({ widgets: [] } as unknown as WidgetState),
        isLoading: !error && !data,
        error: error,
    };
}