import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Form, Button, Input, PopUp, Textarea } from "../../../../components";
import { LogIn } from "../../../../context";
import { LogInUser, PostProps } from "../../../../types";
import { postPOST } from "../../../../api";
import { errorBlog } from "../../../../utils";
import { ROUTES_PATHS } from "../../../../routes";

export const Create = () => {
  const location = useNavigate();
  const { user } = useContext(LogIn) as LogInUser;

  const queryClient = useQueryClient();

  //  const [sendSucesModal, setSendSuccesModal] = useState(false);
  // const [sendErrorModal, setSendErrorModal] = useState(false);

  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState<string | null>(null);

  const [description, setDescription] = useState("");
  const [errDescription, setErrDescription] = useState<string | null>(null);

  const [linkImage, setLinkImage] = useState("");
  const [errLinkimage, setErrLinkImage] = useState<string | null>(null);

  const [date, setData] = useState("");
  const [errData, setErrData] = useState<string | null>(null);

  const { data, mutate, error, isError, isLoading } = useMutation({
    mutationFn: postPOST,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], data);
      location(`${ROUTES_PATHS.posts}`);
    },
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setSendSuccesModal(true);
  //   }

  //   if (isError) {
  //     setSendErrorModal(true);
  //   }
  // }, [isError, isSuccess]);

  function sendPost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrTitle(!title ? `${errorBlog.title}` : null);
    setErrDescription(!description ? `${errorBlog.description}` : null);
    setErrLinkImage(!linkImage ? `${errorBlog.link}` : null);
    setErrData(!date ? `${errorBlog.data}` : null);

    if (!title && !description && !linkImage && !data) return;
    if (!title) return;
    if (!description) return;
    if (!linkImage) return;
    if (!date) return;

    let uniq = new Date().getTime();

    const postObj: PostProps = {
      title,
      description,
      linkImage,
      date,
      author: {
        name: user?.name,
        prenume: user?.prenume,
      },
      id: uniq,
    };

    mutate(postObj);

    setTitle("");
    setDescription("");
    setLinkImage("");
    setData("");
  }

  const errorMsj = error as any;

  function onBlurElement(e: React.ChangeEvent<HTMLInputElement>) {
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
    setData(data);
  }

  return (
    <div className="postare">
      <h1>Creaza o postare</h1>

      {isLoading && <h1>loading...</h1>}

      {isError && (
        <PopUp type="fail">
          <p>{errorMsj.message}</p>
        </PopUp>
      )}

      <Form onSendFn={sendPost}>
        <div className="postare__form-edit">
          <Input
            type="text"
            value={title}
            placeholder="Titlul postarii"
            onChange={(e) => setTitle(e.target.value)}
            errorMsj={errTitle}
            label="Title"
            id="title"
          />

          <Textarea
            value={description}
            errorMsj={errDescription}
            onChange={(e) => setDescription(e.target.value)}
            id="desc"
            label="Description"
          />
        </div>

        <div className="postare__form-edit">
          <Input
            type="text"
            value={linkImage}
            placeholder="Link catre unsplash.com"
            errorMsj={errLinkimage}
            onBlur={(e) => setLinkImage(e.target.value)}
            onChange={(e) => setLinkImage(e.target.value)}
            label="Link catre imagine"
            id="img"
          />

          <Input
            type="date"
            errorMsj={errData}
            onBlur={onBlurElement}
            label="Date"
            id="date"
          />
        </div>

        <Button type="primary">Add post</Button>
      </Form>
    </div>
  );
};
