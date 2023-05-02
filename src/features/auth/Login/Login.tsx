import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Password, Input, Button } from "../../../components";
import { ROUTES_PATHS } from "../../../routes";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");

  function logInUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email === "" && password === "") {
      setErrEmail("Introdu un email");
      setErrPassword("Introdu o parola");
      return;
    }

    if (email === "") {
      setErrEmail("Introdu un email");
      setErrPassword("");
      return;
    }

    if (password === "") {
      setErrPassword("Introdu o parola");
      setErrEmail("");
      return;
    }

    setErrEmail("");
    setErrPassword("");

    const logIn = {
      email,
      password,
    };
  }

  return (
    <Form onSendFn={logInUser} title="Log in">
      <p className="exist_account">
        Don't have an account yet?{" "}
        <span>
          <Link to={`${ROUTES_PATHS.register}`}>Sign Up</Link>
        </span>
      </p>

      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        errorMsj={errEmail}
      />

      <Password
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        errorMsj={errPassword}
      />

      <Button title="Log in" />
    </Form>
  );
};
