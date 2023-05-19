import { useQuery } from "@tanstack/react-query";
import { useParams, Navigate } from "react-router-dom";

import { getPost } from "@/api";
import { PageCard, Loading } from "@/components";
import { ROUTES_PATHS } from "@/routes";

export const BlogDetails = () => {
  const { id } = useParams();
  const regEx = /\d/.test(id!);

  const { data, isLoading } = useQuery(["post", id], () => getPost(Number(id)));

  if (!regEx) {
    return <Navigate to={`${ROUTES_PATHS.posts}`}></Navigate>;
  }

  return (
    <PageCard>
      {isLoading && <Loading />}

      <div className="details-blog">
        <div className="details-blog__author">
          <p className="details-blog__author">
            Author:
            <span className="details-blog__author--info">
              {data?.author.name}
            </span>{" "}
            <span className="details-blog_author--info">
              {data?.author.prenume}
            </span>
          </p>
        </div>

        <div className="details-blog__title-date">
          <h1>{data?.title}</h1>
          <p className="details-blog__date-post">{data?.date}</p>
        </div>

        <p className="details-blog__description">{data?.description}</p>
        <img className="details-blog__image" src={data?.linkImage} />
      </div>
    </PageCard>
  );
};
