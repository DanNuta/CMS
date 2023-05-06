import { getDefaultState } from "@tanstack/query-core/build/lib/mutation";
import axios from "axios";

import { PostProps } from "../types";

const url = "http://localhost:3001/posts";

export async function postPOST<PostProps>(blog: PostProps): Promise<PostProps> {
  const post = await axios.post(`${url}`, { ...blog });

  return await post.data;
}

export async function getPosts(): Promise<PostProps[]> {
  const posts = await axios.get(`${url}`);

  return await posts.data;
}
