import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getPost, updatePostPUT } from "@/api";
import { PostProps, EditCreatePropsTypes } from "@/types";
import { ROUTES_PATHS } from "@/routes";
import { EditPost } from "@/components";
import { PageCard, Loading } from "@/components";

export const Edit = () => {
  const { id } = useParams();

  const idToNumber = Number(id);

  const location = useNavigate();

  const { data, isLoading } = useQuery<PostProps>(["post", id], () =>
    getPost(idToNumber)
  );

  const { mutate } = useMutation({
    mutationFn: updatePostPUT,
    onSuccess: () => {
      location(`${ROUTES_PATHS.posts}`);
    },
  });

  function editBlogFn(v: EditCreatePropsTypes) {
    if (data === undefined) return;
    const editBlog: PostProps = {
      ...v,
      author: {
        name: data.author.name,
        prenume: data.author.prenume,
      },
      id: data.id,
    };

    mutate(editBlog);
  }

  return (
    <PageCard title="Change post data">
      {isLoading ? (
        <Loading />
      ) : (
        <EditPost posts={data} onClick={editBlogFn}></EditPost>
      )}
    </PageCard>
  );
};
