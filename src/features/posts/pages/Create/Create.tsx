import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { Form, Button, Input } from "../../../../components";
import { LogIn } from "../../../../context";
import { LogInUser, PostProps } from "../../../../types";
import { postPOST } from "../../../../api";
import { errorBlog } from "../../../../utils";

export const Create = () => {
  const { user } = useContext(LogIn) as LogInUser;

  const [title, setTitle] = useState("");
  const [errTitle, setErrTitle] = useState<string | null>(null);

  const [description, setDescription] = useState("");
  const [errDescription, setErrDescription] = useState<string | null>(null);

  const [linkImage, setLinkImage] = useState("");
  const [errLinkimage, setErrLinkImage] = useState<string | null>(null);

  const [date, setData] = useState("");
  const [errData, setErrData] = useState<string | null>(null);

  const { data, mutate, error, isError, isSuccess } = useMutation({
    mutationFn: postPOST,
  });

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

    console.log(postObj);
  }

  return (
    <div className="postare">
      <h1>Creaza o postare</h1>
      {isError && <h1>{error.message}</h1>}
      {isSuccess && <h1>Datele adaugate cu suuces</h1>}

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
