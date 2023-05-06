import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Form, Button, Input, PopUp } from "../../../../components";
import { LogIn } from "../../../../context";
import { LogInUser, PostProps } from "../../../../types";
import { postPOST } from "../../../../api";
import { errorBlog } from "../../../../utils";
import { ROUTES_PATHS } from "../../../../routes";

export const Create = () => {
  const location = useNavigate();
  const { user } = useContext(LogIn) as LogInUser;

  const [sendSucesModal, setSendSuccesModal] = useState(false);
  const [sendErrorModal, setSendErrorModal] = useState(false);

  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState<string | null>(null);

  const [description, setDescription] = useState("");
  const [errDescription, setErrDescription] = useState<string | null>(null);

  const [linkImage, setLinkImage] = useState("");
  const [errLinkimage, setErrLinkImage] = useState<string | null>(null);

  const [date, setData] = useState("");
  const [errData, setErrData] = useState<string | null>(null);

  const { data, mutate, error, isError, isSuccess, isLoading } = useMutation({
    mutationFn: postPOST,
  });

  useEffect(() => {
    if (isSuccess) {
      setSendSuccesModal(true);
    }

    if (isError) {
      setSendErrorModal(true);
    }
  }, [isError, isSuccess]);

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

    location(`${ROUTES_PATHS.posts}`);
  }

  return (
    <div className="postare">
      <h1>Creaza o postare</h1>

      {isLoading && <h1>loading...</h1>}

      {isError && (
        <PopUp type="fail">
          <p>{error.message}</p>
        </PopUp>
      )}

      <Form onSendFn={sendPost}>
        <div>
          <Input
            type="text"
            value={title}
            placeholder="Titlul postarii"
            onChange={(e) => setTitle(e.target.value)}
            errorMsj={errTitle}
          />

          <Input
            type="textarea"
            value={description}
            placeholder="Descrierea postarii"
            errorMsj={errDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Input
            type="text"
            value={linkImage}
            placeholder="Link catre unsplash.com"
            errorMsj={errLinkimage}
            onBlur={(e) => setLinkImage(e.target.value)}
            onChange={(e) => setLinkImage(e.target.value)}
          />

          <Input
            type="date"
            errorMsj={errData}
            onBlur={(e) => setData(e.target.value)}
          />
        </div>

        <Button type="primary">Add post</Button>
      </Form>
    </div>
  );
};
