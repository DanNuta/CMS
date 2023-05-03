import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
import { postUsers } from "../../../../api";
import { UserProps } from "types";

interface ModalProps {
  onCancel: () => void;
  onAddUser: () => void;
}

export const UserModalForm: React.FC<ModalProps> = ({
  onCancel,
  onAddUser,
}) => {
  const { mutate } = useMutation({
    mutationFn: postUsers,
  });

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["users"] });

  // state
  const [name, setName] = useState("");
  const [errName, setErrName] = useState<string | null>(null);

  const [prenume, setPrenume] = useState("");
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string>("masculin");
  const [errGender, setErrGender] = useState<string | null>(null);

  const [rol, setRol] = useState<string>("moderator");
  const [errRol, setErrRol] = useState<string | null>(null);

  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string | null>(null);

  const [checkbox, setCheckBox] = useState(false);
  const [errCheckbox, setErrCheckBox] = useState<string | null>(null);

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

    mutate(dataForm);
    onCancel();
  }

  return (
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
        name="gen"
        onChange={(e) => setRol(e.target.value)}
        options={["Moderator", "Aministrator"]}
      />

      <Checkbox
        label={"Sunt deacord cu prelucrarea datelor personale"}
        type={"checkbox"}
        id="user"
        errorMsj={errCheckbox}
        onChange={(e) => setCheckBox(e.target.checked)}
      />

      <div className="modal__btns">
        <Button type="danger" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="primary">Add</Button>
      </div>
    </Form>
  );
};
