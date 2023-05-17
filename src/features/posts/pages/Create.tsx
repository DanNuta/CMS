import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context";
import { PostProps, EditCreatePropsTypes } from "@/types";
import { postPOST } from "@/api";
import { ROUTES_PATHS } from "@/routes";
import { PageCard, PopUp, Loading, EditPost } from "@/components";

export const Create = () => {
  const location = useNavigate();
  const { user } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isError, isLoading } = useMutation({
    mutationFn: postPOST,

    onSuccess: () => {
      location(`${ROUTES_PATHS.posts}`);
    },

    onError: (error: Error) => {
      if (typeof error === "object" && error !== null) {
        setServerError(error.message);
      }
    },
  });

  function mutateElement(data: EditCreatePropsTypes) {
    if (user === null) return;
    const uniq = new Date().getTime();
    const postBlog: PostProps = {
      ...data,
      author: {
        name: user.name,
        prenume: user.prenume,
      },
      id: uniq,
    };
    mutate(postBlog);
  }

  return (
    <PageCard title="Create a post">
      {isLoading && <Loading />}

      {isError && (
        <PopUp type="fail">
          <p>{serverError}</p>
        </PopUp>
      )}

      <EditPost onClick={mutateElement} />
    </PageCard>
  );
};
