import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
  Input,
  Checkbox,
  Form,
  Password,
  Select,
  Button,
  ModalForm,
  PopUp,
} from "@/components";
import { ROUTES_PATHS } from "@/routes";
import { postUsers } from "@/api";
import { UserProps } from "@/types";
import { errorInputs, patternRegEx } from "@/utils";
import { useAuth } from "@/context";
import { useStateGlobal } from "@/hooks";

export const Register: React.FC = () => {
  const { setUserState } = useAuth();

  const {
    name,
    prenume,
    email,
    gender,
    password,
    verifyPassword,
    checkbox,

    errName,
    errEmail,
    errPrenume,
    errPassword,
    errVerifyPassword,
    errCheckbox,

    setName,
    setPrenume,
    setEmail,
    setGender,
    setPassword,
    setVerifyPassword,
    setCheckBox,

    setErrName,
    setErrPrenume,
    setErrEmail,
    setErrGender,
    setErrPassword,
    setErrCheckBox,

    changeEmail,
    blurPassword,
    verifyPasswordIfIsTheSame,
  } = useStateGlobal();

  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: postUsers,

    onSuccess: (newData) => {
      setUserState(newData);
      navigate(`${ROUTES_PATHS.users}`);
    },

    onError: (e: Error) => {
      setServerError(e.message);
    },
  });

  function onSendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const testName = !patternRegEx.nume.test(name);
    const testPrenume = !patternRegEx.prenume.test(prenume);
    const testEmail = !patternRegEx.email.test(email);
    const testPasswordTwe = !patternRegEx.password.test(password);
    const testGender = gender === "" ? true : false;
    const error =
      testName || testPrenume || testEmail || testPasswordTwe || !checkbox;

    setErrName(testName ? `${errorInputs.nameErr}` : null);
    setErrPrenume(testPrenume ? `${errorInputs.prenumeErr}` : null);
    setErrEmail(testEmail ? `${errorInputs.emailErr}` : null);
    setErrGender(testGender ? `${errorInputs.genderErr}` : null);
    setErrPassword(testPasswordTwe ? `${errorInputs.passwordErr}` : null);
    setErrCheckBox(!checkbox ? `${errorInputs.checkboxErr}` : null);

    if (error) return;

    setName("");
    setPrenume("");
    setEmail("");
    setGender("");
    setPassword("");
    setCheckBox(false);
    setVerifyPassword("");

    const uniq = new Date().getTime();

    const dataForm: UserProps = {
      name,
      prenume,
      email,
      gender,
      password,
      rol: "moderator",
      id: uniq,
    };

    localStorage.setItem("userId", uniq.toString());

    mutate(dataForm);
  }

  return (
    <ModalForm>
      <Form dimension="custom-form" onSendFn={onSendData} title="Sign up">
        <p className="exist_account">
          Already have an account?{" "}
          <span>
            <Link to={`${ROUTES_PATHS.login}`}>Sign in</Link>
          </span>
        </p>

        {status === "error" && (
          <PopUp type="fail">
            <p>{serverError}</p>
          </PopUp>
        )}

        <Input
          type="text"
          placeholder="Name"
          value={name}
          errorMsj={errName}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="First Name"
          value={prenume}
          errorMsj={errPrenume}
          onChange={(e) => setPrenume(e.target.value)}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          errorMsj={errEmail}
          onChange={changeEmail}
        />

        <Select
          name="sex"
          options={["Masculin", "Femenin", "Ma abtin"]}
          onChange={(e) => setGender(e.target.value)}
        />

        <Password
          value={password}
          placeholder="Password"
          errorMsj={errPassword}
          onBlur={blurPassword}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Password
          value={verifyPassword}
          placeholder="Verify Password"
          errorMsj={errVerifyPassword}
          onBlur={verifyPasswordIfIsTheSame}
          onChange={(e) => setVerifyPassword(e.target.value)}
        />

        <Checkbox
          type="checkbox"
          onChange={(e) => setCheckBox(e.target.checked)}
          label="I agree with the processing of personal data"
          id={"de-acord"}
          errorMsj={errCheckbox}
        />

        <Button element="text" dimension="full" butontype="primary">
          Sign Up
        </Button>
      </Form>
    </ModalForm>
  );
};
