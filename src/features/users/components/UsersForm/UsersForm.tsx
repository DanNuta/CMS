import React, { useEffect, useState } from "react";

import {
  Form,
  Input,
  Select,
  Checkbox,
  Password,
} from "../../../../components";
import { errorInputs, patternRegEx } from "../../../../utils";
import { UserProps } from "types";
import { Modal } from "../../../../components";

interface AddNewUserProps {
  onCancel: () => void;
  onAddUser: (data: UserProps) => void;
  type: "edit" | "create";
  userEdit?: UserProps;
  modalOpen: boolean;
}

export const UsersForm: React.FC<AddNewUserProps> = ({
  onCancel,
  onAddUser,
  userEdit,
  type,
  modalOpen,
}) => {
  const [name, setName] = useState<string>("");
  const [errName, setErrName] = useState<string | null>(null);

  const [prenume, setPrenume] = useState<string>(userEdit?.prenume ?? "");
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string | undefined>(
    userEdit?.gender ?? "masculin"
  );

  const [rol, setRol] = useState<string>("moderator");

  const [password, setPassword] = useState<string>(userEdit?.password ?? "");
  const [errPassword, setErrPassword] = useState<string | null>(null);

  const [checkbox, setCheckBox] = useState(false);
  const [errCheckbox, setErrCheckBox] = useState<string | null>(null);

  useEffect(() => {
    setName(userEdit?.name ?? "");
    setPrenume(userEdit?.prenume ?? "");
    setPassword(userEdit?.password ?? "");
    setEmail(userEdit?.email ?? "");
  }, [userEdit]);

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
    setErrPassword(testPasswordTwe ? `${errorInputs.passwordErr}` : null);
    setErrCheckBox(!checkbox ? `${errorInputs.checkboxErr}` : null);

    if (anyError) return;
    if (testName) return;
    if (testPrenume) return;
    if (testEmail) return;
    if (testPasswordTwe) return;

    if (!userEdit) {
      if (!checkbox) return;
    }

    setName("");
    setPrenume("");
    setEmail("");
    setGender("");
    setPassword("");
    setCheckBox(false);

    var uniq = new Date().getTime();
    const dataForm: UserProps = {
      name,
      prenume,
      email,
      gender,
      password,
      rol,
      id: uniq,
    };

    onAddUser(dataForm);
    onCancel();
  }

  return (
    <Modal
      typeBtn={type === "create" ? "Add a new user" : "Save"}
      openModal={modalOpen}
      onClose={onCancel}
      onConfirm={(e) => addNewUser(e)}
    >
      <Form>
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
          name="gen"
          onChange={(e) => setGender(e.target.value)}
          options={["Masculin", "Femenin", "Ma abtin"]}
        />

        <Select
          name="rol"
          onChange={(e) => setRol(e.target.value)}
          options={["moderator", "administrator"]}
        />

        {!userEdit && (
          <Checkbox
            type="checkbox"
            onChange={(e) => setCheckBox(e.target.checked)}
            label="Sunt deacord cu prelucrarea datelor personale"
            id={"de-acord"}
            errorMsj={errCheckbox}
          />
        )}
      </Form>
    </Modal>
  );
};
