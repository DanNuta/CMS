import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { getPost, updatePostPUT } from "../../../../api";
import { Form, Input, Button, Textarea } from "../../../../components";
import { PostProps } from "../../../../types";
import { ROUTES_PATHS } from "../../../../routes";
import { errorBlog } from "../../../../utils";

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

  const [errorTitle, setErrorTitle] = useState<string | null>(null);
  const [errorDescription, setErrorDescription] = useState<string | null>(null);
  const [errorLinkImage, setErrorLinkImage] = useState<string | null>(null);
  const [errorData, setErrorData] = useState<string | null>(null);

  useEffect(() => {
    setTitle(data?.title);
    setDescription(data?.description);
    setLinkImage(data?.linkImage);
    setDate(data?.date);
    setIdPost(data?.id);
  }, [data]);

  function getDataWithDay(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const date = new Date(value);
    const dayOfTheWeek = date.getDay();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const selectedDayOfWeek = days[dayOfTheWeek];
    const data = `${value} ${selectedDayOfWeek}`;
    setDate(data);
  }

  function sendSaveData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorData(date ? "" : `${errorBlog.data}`);
    setErrorDescription(description ? "" : `${errorBlog.description}`);
    setErrorTitle(title ? "" : `${errorBlog.title}`);
    setErrorLinkImage(linkImage ? "" : `${errorBlog.link}`);

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
    <div className="edit-post">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Form onSendFn={sendSaveData} title="Change post data">
          <Input
            type="text"
            value={title || ""}
            errorMsj={errorTitle}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            id="title"
          />

          <Textarea
            value={description || ""}
            errorMsj={errorDescription}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            id="descriere"
          />

          <Input
            type="date"
            errorMsj={errorData}
            onChange={getDataWithDay}
            label="Date"
            id="data"
          />

          <Input
            type="text"
            value={linkImage || ""}
            errorMsj={errorLinkImage}
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
