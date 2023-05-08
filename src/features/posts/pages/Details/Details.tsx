import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getPost } from "../../../../api";

export const Details = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  return (
    <div className="details">
      {isLoading && <h1>Loading...</h1>}

      <div className="details__blog">
        <div className="author">
          <p>
            Author: <span>{data?.author.name}</span>{" "}
            <span>{data?.author.prenume}</span>
          </p>
        </div>

        <div className="title-date">
          <h1>{data?.title}</h1>
          <p className="date-post">{data?.date}</p>
        </div>

        <p className="descrition">{data?.description}</p>
        <img src={data?.linkImage} alt="" />
      </div>
    </div>
  );
};
