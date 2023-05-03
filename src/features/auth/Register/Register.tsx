import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Checkbox,
  Form,
  Password,
  Select,
  Button,
  ModalForm,
} from "../../../components";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { ROUTES_PATHS } from "../../../routes";
import { postUsers } from "../../../api";
import { UserProps } from "types";

import { patternRegEx } from "./pattern";
import { errorInputs } from "../../../utils";

export const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [errName, setErrName] = useState<string | null>(null);

  const [prenume, setPrenume] = useState("");
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string>("");
  const [errGender, setErrGender] = useState<string | null>(null);

  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string | null>(null);

  const [verifyPassword, setVerifyPassword] = useState<string>("");
  const [errVerifyPassword, setErrVerifyPassword] = useState<string | null>(
    null
  );

  const [checkbox, setCheckBox] = useState(false);
  const [errCheckbox, setErrCheckBox] = useState<string | null>(null);

  const navigate = useNavigate();

  const { data, mutate, status } = useMutation({
    mutationFn: postUsers,
  });

  useEffect(() => {
    if (status === "success") {
      navigate("/users");
    }
  }, [data, status]);

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

  async function onSendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const testName = !patternRegEx.nume.test(name);
    const testPrenume = !patternRegEx.prenume.test(prenume);
    const testEmail = !patternRegEx.email.test(email);
    const testPasswordTwe = !patternRegEx.password.test(password);
    const testGender = gender === "" ? true : false;
    const anyError =
      testName &&
      testPrenume &&
      testEmail &&
      testGender &&
      testPasswordTwe &&
      !checkbox;

    setErrName(testName ? `${errorInputs.nameErr}` : null);
    setErrPrenume(testPrenume ? `${errorInputs.prenumeErr}` : null);
    setErrEmail(testEmail ? `${errorInputs.emailErr}` : null);
    setErrGender(testGender ? `${errorInputs.genderErr}` : null);
    setErrPassword(testPasswordTwe ? `${errorInputs.passwordErr}` : null);
    setErrCheckBox(!checkbox ? `${errorInputs.checkboxErr}` : null);

    if (anyError) return;

    if (testName) return;
    if (testPrenume) return;
    if (testEmail) return;
    if (testPasswordTwe) return;
    if (!checkbox) return;

    setName("");
    setPrenume("");
    setEmail("");
    setGender("");
    setPassword("");
    setCheckBox(false);
    setVerifyPassword("");

    const dataForm: UserProps = {
      name,
      prenume,
      email,
      gender,
      password,
      rol: "moderator",
      id: Math.random(),
    };

    mutate(dataForm);
  }

  return (
    <ModalForm>
      <Form onSendFn={onSendData} title="Sign up">
        <p className="exist_account">
          Already have an account?{" "}
          <span>
            <Link to={`${ROUTES_PATHS.login}`}>Sign in</Link>
          </span>
        </p>

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

        <Button>Sign Up</Button>
      </Form>
    </ModalForm>
  );
};
