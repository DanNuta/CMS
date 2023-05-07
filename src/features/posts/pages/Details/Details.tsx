import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getPost } from "../../../../api";

export const Details = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  console.log(data);

  return (
    <div className="details">
      {isLoading && <h1>Loading...</h1>}

      <div>
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <p>{data?.date}</p>
        <p>
          <span>{data?.author.name}</span> <span>{data?.author.prenume}</span>
        </p>
        <img src={data?.linkImage} alt="" />
      </div>
    </div>
  );
};
