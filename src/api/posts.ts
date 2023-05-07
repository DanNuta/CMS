import axios from "axios";

import { PostProps } from "../types";

const url = "http://localhost:3001/posts";

export function postPOST<PostProps>(blog: PostProps): any {
  axios.post(`${url}`, { ...blog }).then((data) => data.data);
}

export async function getPosts(): Promise<PostProps[]> {
  const posts = await axios.get(`${url}`);

  return await posts.data;
}

export async function getPost(id?: number | string): Promise<PostProps> {
  const posts = await axios.get(`${url}/${id}`);

  return await posts.data;
}

export async function deletePost(id: number | null) {
  const postDelete = await axios.delete(`${url}/${id}`);
  return await postDelete.data;
}

export function updatePostPUT(updateData: PostProps): any {
  axios.put(`${url}/${updateData.id}`, updateData).then((res) => res.data);
}
