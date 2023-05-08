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

export async function getUser(id: number): Promise<any> {
  const data = await axios.get(`${urlUsers}/${id}`);
  const res = await data.data;

  return res;
}

export async function logIn(email: string, password: string) {
  const data = await axios.get(
    `${urlUsers}?email=${email}&password=${password}`
  );
  const res = await data.data;

  return res;
}

export async function updateUser(data: UserProps) {
  const id = data.id;
  const dataPut = await axios.put(`${urlUsers}/${id}`, data);

  return await dataPut.data;
}
