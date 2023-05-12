import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Checkbox,
  Form,
  Password,
  Select,
  Button,
  ModalForm,
  PopUp,
} from "../../../components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { ROUTES_PATHS } from "../../../routes";
import { postUsers } from "../../../api";
import { UserProps, UserContextType } from "types";
import { errorInputs, patternRegEx } from "../../../utils";
import { UserContext } from "../../../context";

export const Register: React.FC = () => {
  const { setUserState } = useContext(UserContext) as UserContextType;

  const [name, setName] = useState("");
  const [errName, setErrName] = useState<string | null>(null);

  const [prenume, setPrenume] = useState("");
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string>("masculin");
  const [errGender, setErrGender] = useState<string | null>(null);

  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string | null>(null);

  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [errVerifyPassword, setErrVerifyPassword] = useState<string | null>(
    null
  );

  const [checkbox, setCheckBox] = useState(false);
  const [errCheckbox, setErrCheckBox] = useState<string | null>(null);

  const [serverError, setServerError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: postUsers,

    onSuccess: (newData: UserProps) => {
      console.log(newData);
      setUserState(newData);
      navigate(`${ROUTES_PATHS.users}`);
    },

    onError: (e: Error) => {
      setServerError(e.message);
    },
  });

  function changeEmail(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    const testEmail = !patternRegEx.email.test(value);

    setEmail(value);
    setErrEmail(testEmail ? `${errorInputs.emailErr}` : null);
  }

  function blurPassword(data: React.FocusEvent<HTMLInputElement, Element>) {
    const value = data.target.value;
    const testPassword = !patternRegEx.password.test(value);

    setPassword(value);
    setErrPassword(testPassword ? `${errorInputs.weakPassword}` : null);
  }

  function verifyPasswordIfIsTheSame(
    data: React.FocusEvent<HTMLInputElement, Element>
  ) {
    const value = data.target.value;
    setErrVerifyPassword(
      password !== value ? `${errorInputs.passwordIsNotTheSame}` : null
    );
  }

  // send data

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
          placeholder="Nume"
          value={name}
          errorMsj={errName}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          type="text"
          placeholder="Prenume"
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
          value={gender}
          errorMsj={errGender}
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
          label="Sunt deacord cu prelucrarea datelor personale"
          id={"de-acord"}
          errorMsj={errCheckbox}
        />

        <Button dimension="full" type="primary">
          Sign Up
        </Button>
      </Form>
    </ModalForm>
  );
};
