import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Form, Password, Input, Button } from "../../../components";
import { ROUTES_PATHS } from "../../../routes";
import { ModalForm, PopUp } from "../../../components";
import { logIn } from "../../../api";
import { UserProps, LogInUser } from "types";
import { LogIn } from "../../../context";

export const Login = () => {
  const { changeUser } = useContext(LogIn) as LogInUser;
  const location = useNavigate();

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [popUp, setPopUp] = useState<boolean | null>(null);

  const [logInState, setLogInState] = useState(false);

  const { data, isLoading } = useQuery<UserProps[]>(
    ["logIn"],
    () => logIn(email, password),
    { enabled: logInState }
  );

  useEffect(() => {
    if (data?.length === 0) {
      setPopUp(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setPopUp(false);
      }, 2000);
    }

    if (data?.length! > 0) {
      const val = data?.[0];
      const id = val!.id!.toString();

      localStorage.setItem("userId", id);
      changeUser(val!);

      location("/users");

      setEmail("");
      setPassword("");
    }
  }, [data]);

  function logInUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrEmail(email === "" ? "Introdu un email" : "");
    setErrPassword(password === "" ? "Introdu o parola" : "");

    if (email === "") return;
    if (password === "") return;
    if (email === "" && password === "") return;

    setLogInState(true);
  }

  return (
    <>
      {popUp && (
        <PopUp type="danger">
          <p>
            Nu ai introdus corect datele, creazati un cont da nu ai deja unul
          </p>
        </PopUp>
      )}

      <ModalForm>
        <Form onSendFn={logInUser} title="Log in">
          <p className="exist_account">
            Don't have an account yet?{" "}
            <span>
              <Link to={`${ROUTES_PATHS.register}`}>Sign Up</Link>
            </span>
          </p>

          <Input
            value={email}
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            errorMsj={errEmail}
          />

          <Password
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            errorMsj={errPassword}
          />

          <Button type="primary" dimension="full">
            Log in
          </Button>
        </Form>
      </ModalForm>
    </>
  );
};
