import axios from "axios";

import { PostProps } from "../types";

const url = "http://localhost:3001/posts";

export async function postPOST(blog: PostProps): Promise<void> {
  const post = await axios.post(`${url}`, { ...blog });

  return await post.data;
}
