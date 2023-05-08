import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import { Form, Password, Input, Button } from "../../../components";
import { ROUTES_PATHS } from "../../../routes";
import { ModalForm, PopUp } from "../../../components";
import { logIn } from "../../../api";
import { UserProps, LogInUser } from "types";
import { LogIn } from "../../../context";
import { errorInputs } from "../../../utils";

export const Login = () => {
  const { changeUser } = useContext(LogIn) as LogInUser;
  const location = useNavigate();

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");

  const [password, setPassword] = useState("");
  const [errPassword, setErrPassword] = useState("");

  const [dataIsSubmites, setDataIsSubmited] = useState(false);

  const emailTest = useRef("");
  const passwordTest = useRef("");

  const [popUpSucces, setPopUpSucces] = useState(false);

  //const [logInState, setLogInState] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["login"],
    queryFn: () => logIn(emailTest.current, passwordTest.current),
    enabled: dataIsSubmites,

    onSuccess: (data) => {
      if (data.length) {
        const val = data[0];
        const id = val.id.toString();
        localStorage.setItem("userId", id);
        changeUser(val);
        location(`${ROUTES_PATHS.users}`);
      }
    },
  });

  setTimeout(() => {
    setDataIsSubmited(false);
  }, 100);

  // useEffect(() => {
  //   if (data?.length === 0) {
  //     setLogInState(false);

  //     setPopUpSucces(true);

  //     setEmail("");
  //     setPassword("");
  //   }

  //   if (data?.length! > 0) {
  //     setLogInState(true);
  //     const val = data?.[0];
  //     const id = val!.id!.toString();

  //     localStorage.setItem("userId", id);
  //     changeUser(val);

  //     location(`${ROUTES_PATHS.users}`);

  //     setEmail("");
  //     setPassword("");
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (data?.length) {
  //     const val = data[0];
  //     const id = val.id.toString();
  //     changeUser(val);
  //     location(`${ROUTES_PATHS.users}`);
  //   } else {
  //     //setPopUpSucces(true);
  //   }

  //   console.log(data);
  // }, [data, isFetching, isLoading]);

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    emailTest.current = e.target.value;
    //setEmail(e.target.value);
  }

  function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    passwordTest.current = value;

    logIn(emailTest.current, passwordTest.current);

    //setPassword(e.target.value)
  }

  console.log(dataIsSubmites);

  function logInUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrEmail(emailTest.current === "" ? `${errorInputs.emailErr}` : "");
    setErrPassword(
      passwordTest.current === "" ? `${errorInputs.passwordErr}` : ""
    );

    if (emailTest.current === "") return;
    if (passwordTest.current === "") return;
    if (emailTest.current === "" && passwordTest.current === "") return;

    setDataIsSubmited(true);
  }

  return (
    <>
      {/* {popUpSucces && (
        <PopUp type="fail">
          <p>
            Nu ai introdus corect datele, creazati un cont da nu ai deja unul
          </p>
        </PopUp>
      )} */}

      {isFetching && <h1>Loading...</h1>}

      {isLoading && <h1>Load....</h1>}
      <ModalForm>
        <Form dimension="custom-form" onSendFn={logInUser} title="Log in">
          <p className="exist_account">
            Don't have an account yet?{" "}
            <span>
              <Link to={`${ROUTES_PATHS.register}`}>Sign Up</Link>
            </span>
          </p>

          <Input
            // value={passwordTest.current}
            type="email"
            placeholder="Email"
            onChange={updateEmail}
            errorMsj={errEmail}
          />

          <Password
            // value={password}
            placeholder="Password"
            onChange={updatePassword}
            errorMsj={errPassword}
          />

          <Button type="primary" dimension="full">
            {isLoading ? "Loading..." : "Log in "}
          </Button>
        </Form>
      </ModalForm>
    </>
  );
};
