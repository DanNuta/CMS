import axios from "axios";

import { PostProps } from "../types";

const url = import.meta.env.VITE_ENDPOINT_POSTS;

export async function postPOST(blog: PostProps) {
  await axios.post(url, blog);
}

export async function getPosts(): Promise<PostProps[]> {
  const { data } = await axios.get(url);
  return data;
}

export async function getPost(id?: string): Promise<PostProps> {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function deletePost(id: string) {
  await axios.delete(`${url}/${id}`);
}

export async function updatePostPUT(updateData: PostProps): Promise<void> {
  await axios.put(`${url}/${updateData._id}`, updateData);
}

export async function getData<T>(urls: string): Promise<T> {
  const data = await axios.get(urls);
  return data.data;
}
