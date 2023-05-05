import { Link } from "react-router-dom";

import { Button } from "../../../../components";
import { ROUTES_PATHS } from "../../../../routes";

export const Posts = () => {
  return (
    <div>
      <h1>Posts</h1>
      <Link to={`${ROUTES_PATHS.postCreate}`}>Add new post</Link>
    </div>
  );
};
