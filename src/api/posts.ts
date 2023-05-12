import axios from "axios";

import { PostProps } from "../types";

const url = import.meta.env.VITE_ENDPOINT_POSTS;

export async function postPOST(blog: PostProps) {
  await axios.post(`${url}`, blog);
}

export async function getPosts(): Promise<PostProps[]> {
  const posts = await axios.get(`${url}`);
  return posts.data;
}

export async function getPost(id: number): Promise<PostProps> {
  const posts = await axios.get(`${url}/${id}`);
  return posts.data;
}

export async function deletePost(id: number) {
  await axios.delete(`${url}/${id}`);
}

export async function updatePostPUT(updateData: PostProps): Promise<void> {
  await axios.put(`${url}/${updateData.id}`, updateData);
}

export async function getData<T>(urls: string): Promise<T> {
  const data = await axios.get(`${urls}`);
  return data.data;
}
