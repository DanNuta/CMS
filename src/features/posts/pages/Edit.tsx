import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getPost, updatePostPUT } from "@/api";
import { PostProps, EditCreatePropsTypes } from "@/types";
import { ROUTES_PATHS } from "@/routes";
import { EditPost } from "@/components";
import { PageCard, Loading } from "@/components";
import { useAuth } from "@/context";

export const Edit = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const location = useNavigate();

  const { data, isLoading } = useQuery<PostProps>(["post", id], () =>
    getPost(id)
  );

  const { mutate } = useMutation({
    mutationFn: updatePostPUT,
    onSuccess: () => {
      location(`${ROUTES_PATHS.posts}`);
    },
  });

  function editBlogFn(v: EditCreatePropsTypes) {
    console.log(user);
    if (user === undefined || data === undefined) return;
    const editBlog: PostProps = {
      ...v,
      author: {
        name: user?.name,
        prenume: user?.prenume,
        id: user!._id!,
      },
      _id: data._id,
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
