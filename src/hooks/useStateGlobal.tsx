import React, { useState } from "react";

import { errorInputs, patternRegEx } from "@/utils";

export const useStateGlobal = () => {
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

  return {
    name,
    prenume,
    email,
    gender,
    password,
    verifyPassword,
    checkbox,

    errName,
    errPrenume,
    errEmail,
    errGender,
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
    setErrVerifyPassword,
    setErrCheckBox,

    changeEmail,
    blurPassword,
    verifyPasswordIfIsTheSame,
  };
};
