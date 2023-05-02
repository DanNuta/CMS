import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Input,
  Checkbox,
  Form,
  Password,
  Select,
  Button,
} from "../../../components";
import { useMutation } from "@tanstack/react-query";

import { ROUTES_PATHS } from "../../../routes";
import { postUsers } from "../../../api/index";
import { UserProps } from "types";

import { patternRegEx } from "./pattern";
import "./style.scss";

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

  function changeName(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    setName(value);
  }

  function changeFirstName(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    setPrenume(value);
  }

  function changeEmail(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.value;
    setEmail(value);

    if (!patternRegEx.email.test(value)) {
      setErrEmail("Acesta nu este un email corect");
      return;
    } else {
      setErrEmail(null);
    }
  }

  function changeGender(data: React.ChangeEvent<HTMLSelectElement>) {
    const value = data.target.value;
    setGender(value);
  }

  const { error, data, mutate } = useMutation({
    mutationFn: postUsers,
  });

  function blurPassword(data: React.FocusEvent<HTMLInputElement, Element>) {
    const value = data.target.value;

    setPassword(value);

    if (!patternRegEx.password.test(value)) {
      setErrPassword("Acesta nu este o parola puternica");
      return;
    } else {
      setErrPassword(null);
    }
  }

  function verifyPasswordIfIsTheSame(
    data: React.FocusEvent<HTMLInputElement, Element>
  ) {
    const value = data.target.value;

    if (password !== value) {
      setErrVerifyPassword("Parolele nu coicid");
    } else {
      setErrVerifyPassword(null);
    }
  }

  function checkPersonalData(data: React.ChangeEvent<HTMLInputElement>) {
    const value = data.target.checked;
    setCheckBox(value);
  }

  // send data

  async function onSendData(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const testName = !patternRegEx.nume.test(name);
    const testPrenume = !patternRegEx.prenume.test(prenume);
    const testEmail = !patternRegEx.email.test(email);
    const testPasswordTwe = !patternRegEx.password.test(password);
    const testGender = gender === "" ? true : false;

    if (
      testName &&
      testPrenume &&
      testEmail &&
      testGender &&
      testPasswordTwe &&
      !checkbox
    ) {
      setErrName("Acest nume nu este corect");
      setErrPrenume("Acesta nu este un prenume corect");
      setErrEmail("Acesta nu este un email corect");
      setErrGender("Te rog selecteaza un sex");
      setErrPassword("Trebuie sa introduci o parola");
      setErrCheckBox("Trebuie sa ne permiti sa iti preluam datele");
      return;
    }

    if (testName) {
      setErrName("Acest nume nu este corect");
      return;
    } else {
      setErrName(null);
    }

    if (testPrenume) {
      setErrPrenume("Acesta nu este un prenume corect");
      return;
    } else {
      setErrPrenume(null);
    }

    if (testEmail) {
      setErrEmail("Acesta nu este un email corect");
      return;
    } else {
      setErrEmail(null);
    }

    if (testGender) {
      setErrGender("Te rog selecteaza un sex");
      return;
    } else {
      setErrGender(null);
    }

    if (testPasswordTwe) {
      setErrPassword("Trebuie sa introduci o parola");
      return;
    } else {
      setErrPassword(null);
    }

    if (!checkbox) {
      setErrCheckBox("Trebuie sa ne permiti sa iti preluam datele");
      return;
    } else {
      setErrCheckBox(null);
    }

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

  useEffect(() => {
    console.log(data, error);
  }, [data, error]);

  return (
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
        onChange={changeName}
      />

      <Input
        type="text"
        placeholder="Prenume"
        value={prenume}
        errorMsj={errPrenume}
        onChange={changeFirstName}
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
        onChange={changeGender}
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
        onChange={checkPersonalData}
        label="Sunt deacord cu prelucrarea datelor personale"
        id={"de-acord"}
        errorMsj={errCheckbox}
      />

      <Button title="Sign Up" />
    </Form>
  );
};
