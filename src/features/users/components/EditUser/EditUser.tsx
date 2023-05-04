import React, { useState } from "react";

import {
  Form,
  Input,
  Button,
  Select,
  Checkbox,
  Password,
} from "../../../../components";
import { errorInputs, patternRegEx } from "../../../../utils";
import { UserProps } from "types";
import { UserModalForm } from "../UserModalForm/UserModalForm";

interface ModalProps {
  onCancel: () => void;
  onEditUser: (data: UserProps) => void;
  user?: UserProps;
}

export const EditUser: React.FC<ModalProps> = ({
  onCancel,
  onEditUser,
  user,
}) => {
  const [name, setName] = useState<string | undefined>(user?.name);
  const [errName, setErrName] = useState<string | null>(null);

  const [prenume, setPrenume] = useState<string | undefined>(user?.prenume);
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string | undefined>("masculin");
  const [errGender, setErrGender] = useState<string | null>(null);

  const [rol, setRol] = useState<string>("moderator");
  const [errRol, setErrRol] = useState<string | null>(null);

  const [password, setPassword] = useState<string | undefined>(user?.password);
  const [errPassword, setErrPassword] = useState<string | null>(null);

  // function for check Error

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

    const dataForm: UserProps = {
      name,
      prenume,
      email,
      gender,
      password,
      rol,
    };

    onEditUser(dataForm);
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

        <div className="modal__btns">
          <Button type="danger" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary">Save</Button>
        </div>
      </Form>
    </UserModalForm>
  );
};
