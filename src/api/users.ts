import axios from "axios";
import { redirect } from "react-router-dom";

import { UserProps } from "../types";

const urlUsers = import.meta.env.VITE_ENDPOINT_USERS;
const loginApi = import.meta.env.VITE_ENDPOINT_LOGIN;

export async function postUsers(data: UserProps): Promise<UserProps> {
  const user = await axios.post(urlUsers, data);
  return user.data;
}

export async function getsUsers(): Promise<UserProps[]> {
  const data = await axios.get<UserProps[]>(urlUsers);
  return data.data;
}

export async function deleteUser(id: number): Promise<void> {
  await axios.delete(`${urlUsers}/${id}`);
}

export async function getUser(): Promise<any> {
  try {
    const id = Number(localStorage.getItem("userId"));
    const data = await axios.get(`${urlUsers}/${id}`);
    return data.data;
  } catch (e) {
    localStorage.clear();
    return redirect("/login");
  }
}

export async function logIn(
  email: string,
  password: string
): Promise<UserProps> {
  const { data } = await axios.post<UserProps>(loginApi, {
    email,
    password,
  });

  if (!Object.keys(data).length) {
    throw new Error("Acest utilizator nu exista");
  }

  return data;
}

export async function updateUser(data: UserProps) {
  const id = data._id;
  await axios.put(`${urlUsers}/${id}`, data);
}
