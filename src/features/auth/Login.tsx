import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { Form, Password, Input, Button, ModalForm, PopUp } from "@/components";
import { ROUTES_PATHS } from "@/routes";
import { logIn } from "@/api";
import { UserProps } from "@/types";
import { useAuth } from "@/context";
import { errorInputs } from "@/utils";
import { useStateGlobal } from "@/hooks";

export const Login = () => {
  const { updateUser } = useAuth();
  const { errEmail, setErrEmail, setErrPassword, errPassword } =
    useStateGlobal();

  const location = useNavigate();

  const emailTest = useRef("");
  const passwordTest = useRef("");

  const [errorMsj, setErrorMsj] = useState<string | null>(null);

  const { status, mutate } = useMutation<UserProps>({
    mutationFn: () => logIn(emailTest.current, passwordTest.current),

    onSuccess: (data) => {
      const id = data._id;
      localStorage.setItem("userId", id);
      updateUser(data);
      location(`${ROUTES_PATHS.users}`);
    },

    onError: (error) => {
      if (typeof error === "object" && error !== null) {
        setErrorMsj(error.toString());
      }
    },
  });

  function updateEmail(e: React.ChangeEvent<HTMLInputElement>) {
    emailTest.current = e.target.value;
  }

  function updatePassword(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    passwordTest.current = value;
  }

  function logInUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrEmail(emailTest.current === "" ? `${errorInputs.emailErr}` : "");
    setErrPassword(
      passwordTest.current === "" ? `${errorInputs.passwordErr}` : ""
    );

    const inputError =
      emailTest.current === "" ||
      passwordTest.current === "" ||
      (emailTest.current === "" && passwordTest.current === "");

    if (inputError) return;

    mutate();
  }

  return (
    <>
      {status === "error" && (
        <PopUp type="fail">
          <p>{errorMsj}</p>
        </PopUp>
      )}

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

          <Button element="text" butontype="primary" dimension="full">
            Log In
          </Button>
        </Form>
      </ModalForm>
    </>
  );
};
