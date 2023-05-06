import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button, Card } from "../../../../components";
import { ROUTES_PATHS } from "../../../../routes";
import { getPosts } from "../../../../api";

export const Posts = () => {
  const { data } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  console.log(data);

  return (
    <div>
      <h1>Posts</h1>
      <Link to={`${ROUTES_PATHS.postCreate}`}>Add new post</Link>

      <div className="card-parent">
        {data?.map((item, i) => {
          return <Card data={item} key={i} />;
        })}
      </div>
    </div>
  );
};
