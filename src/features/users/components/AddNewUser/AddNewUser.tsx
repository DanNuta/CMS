import React, { useState } from "react";

import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Password,
} from "../../../../components";
import { patternRegEx } from "../../../../regEx";
import { errorInputs } from "../../../../utils";
import { UserProps } from "types";
import { UserModalForm } from "../UserModalForm/UserModalForm";

interface AddNewUserProps {
  onCancel: () => void;
  onAddUser: (data: UserProps) => void;
}

export const AddNewUser: React.FC<AddNewUserProps> = ({
  onCancel,
  onAddUser,
}) => {
  const [name, setName] = useState<string>("");
  const [errName, setErrName] = useState<string | null>(null);

  const [prenume, setPrenume] = useState<string>("");
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string | undefined>("masculin");
  const [errGender, setErrGender] = useState<string | null>(null);

  const [rol, setRol] = useState<string>("moderator");
  const [errRol, setErrRol] = useState<string | null>(null);

  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string | null>(null);

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

  // send data to server

  function addNewUser(e: React.FormEvent<HTMLFormElement>) {
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

    const dataForm: UserProps = {
      name,
      prenume,
      email,
      gender,
      password,
      rol,
      id: Math.random(),
    };

    onAddUser(dataForm);
    onCancel();
  }

  return (
    <UserModalForm>
      <Form onSendFn={(e) => addNewUser(e)}>
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

        <Password
          value={password}
          placeholder="Password"
          errorMsj={errPassword}
          onBlur={blurPassword}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Select
          errorMsj={errGender}
          name="gen"
          onChange={(e) => setGender(e.target.value)}
          options={["Masculin", "Femenin", "Ma abtin"]}
        />

        <Select
          errorMsj={errRol}
          name="rol"
          onChange={(e) => setRol(e.target.value)}
          options={["Moderator", "Aministrator"]}
        />

        <Checkbox
          type="checkbox"
          onChange={(e) => setCheckBox(e.target.checked)}
          label="Sunt deacord cu prelucrarea datelor personale"
          id={"de-acord"}
          errorMsj={errCheckbox}
        />

        <div className="modal__btns">
          <Button type="danger" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary">Add</Button>
        </div>
      </Form>
    </UserModalForm>
  );
};
