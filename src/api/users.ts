import axios from "axios";

import { UserProps } from "../types";

const urlUsers = import.meta.env.VITE_ENDPOINT_USERS;

export async function postUsers(data: UserProps): Promise<UserProps> {
  return await axios.post(`${urlUsers}`, data);
}

export async function getsUsers(): Promise<UserProps[]> {
  const data = await axios.get<UserProps[]>(`${urlUsers}`);
  return data.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${urlUsers}/${id}`);
}

export async function getUser(id: number): Promise<UserProps> {
  const data = await axios.get(`${urlUsers}/${id}`);

  return data.data;
}

export async function logIn(
  email: string,
  password: string
): Promise<UserProps[]> {
  const data = await axios.get(
    `${urlUsers}?email=${email}&password=${password}`
  );
  const res = await data.data;

  if (!res.length) {
    throw new Error("Acest utilizator nu exista");
  }

  return res;
}

export async function updateUser(data: UserProps) {
  const id = data.id;
  await axios.put(`${urlUsers}/${id}`, data);
}
