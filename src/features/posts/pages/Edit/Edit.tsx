import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getPost, updatePostPUT } from "../../../../api";
import { Form, Input, Button } from "../../../../components";
import { PostProps } from "../../../../types";
import { ROUTES_PATHS } from "../../../../routes";

export const Edit = () => {
  const { id } = useParams();
  const location = useNavigate();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<PostProps>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const { mutate } = useMutation({
    mutationFn: updatePostPUT,
    onSuccess: (newData) => {
      queryClient.setQueryData(["post"], newData);
      location(`${ROUTES_PATHS.posts}`);
    },
  });

  //
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [linkImage, setLinkImage] = useState<string | undefined>();
  const [date, setDate] = useState<string | undefined>();
  const [idPost, setIdPost] = useState<number | undefined>();

  useEffect(() => {
    setTitle(data?.title);
    setDescription(data?.description);
    setLinkImage(data?.linkImage);
    setDate(data?.date);
    setIdPost(data?.id);
  }, [data]);

  function sendSaveData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title && !description && !date && !linkImage) return;
    if (!title) return;
    if (!description) return;
    if (!date) return;
    if (!linkImage) return;

    const updatePOST: PostProps = {
      title,
      description,
      date,
      linkImage,
      id: idPost!,
      author: {
        name: data?.author.name,
        prenume: data?.author.prenume,
      },
    };

    mutate(updatePOST);
  }

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Form onSendFn={sendSaveData} title="Change post data">
          <Input
            type="text"
            value={title || ""}
            errorMsj={null}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            id="title"
          />

          <Input
            type="text"
            value={description || ""}
            errorMsj={null}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            id="descriere"
          />

          <Input
            type="date"
            value={date || ""}
            errorMsj={null}
            onChange={(e) => setDate(e.target.value)}
            label="Date"
            id="data"
          />

          <Input
            type="text"
            value={linkImage || ""}
            errorMsj={null}
            onChange={(e) => setLinkImage(e.target.value)}
            label="Link la imagine"
            id="image"
          />

          <Button type="primary">Save</Button>
        </Form>
      )}
    </div>
  );
};
