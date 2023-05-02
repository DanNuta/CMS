import axios from "axios";

import { UserProps } from "../types";

export async function postUsers(data: UserProps) {
  const req = await axios.post(`${import.meta.env.VITE_ENDPOINT_USERS}`, data);
  const response = await req.data;
  // const stringData = JSON.stringify(response)

  return response;
}

export async function getsUsers<T>(): Promise<T> {
  const data = await axios.get(`${import.meta.env.VITE_ENDPOINT_USERS}`);
  const res = await data.data;

  return res;
}
