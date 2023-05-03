import axios from "axios";

import { UserProps } from "../types";

const urlUsers = import.meta.env.VITE_ENDPOINT_USERS;

export async function postUsers(data: UserProps) {
  const req = await axios.post(`${urlUsers}`, data);
  const response = await req.data;

  return response;
}

export async function getsUsers<T>(): Promise<T> {
  const data = await axios.get(`${urlUsers}`);
  const res = await data.data;

  return res;
}

export async function deleteUser(id: number): Promise<any> {
  try {
    const deleteUser = await axios.delete(`${urlUsers}/${id}`);
    const res = deleteUser;
    return res;
  } catch (e) {
    throw new Error("Request-ul a esuat!");
  }
}
