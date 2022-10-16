import Client from "api/client";

export interface User {
    id: number;
    name: string;
    color: string;
    createdAt: number;
}

export const createUser = async (name: string): Promise<User> => {
    let result = await Client.put<User>("/v1/user", { name })
    return result.data
}

export const getUser = async (id: string): Promise<User> => {
    let result = await Client.get<User>(`/v1/user/${id}`)
    return result.data
}