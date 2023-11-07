import React, { useEffect, useState } from "react";

import { Form, Input, Select, Checkbox, Password, Modal } from "@/components";
import { errorInputs, patternRegEx } from "@/utils";
import { UserProps } from "@/types";

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

  const [prenume, setPrenume] = useState<string>("");
  const [errPrenume, setErrPrenume] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [errEmail, setErrEmail] = useState<string | null>(null);

  const [gender, setGender] = useState<string>("masculin");

  const [rol, setRol] = useState<string>("moderator");

  const [password, setPassword] = useState<string>("");
  const [errPassword, setErrPassword] = useState<string | null>(null);

  const [checkbox, setCheckBox] = useState(false);
  const [errCheckbox, setErrCheckBox] = useState<string | null>(null);

  useEffect(() => {
    if (userEdit === undefined) return;
    setName(userEdit.name);
    setPrenume(userEdit.prenume);
    setRol(userEdit.rol);
    setGender(userEdit.gender);
    setPassword(userEdit.password);
    setEmail(userEdit.email);
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

  function cancelModal() {
    setName(userEdit?.name ?? "");
    setPrenume(userEdit?.prenume ?? "");
    setGender(userEdit?.gender ?? "masculin");
    setRol(userEdit?.rol ?? "moderator");
    setPassword(userEdit?.password ?? "");
    setEmail(userEdit?.email ?? "");
    setCheckBox(false);

    setErrName(null);
    setErrPrenume(null);
    setErrCheckBox(null);
    setErrEmail(null);
    setErrPassword(null);

    onCancel();
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
      testName || testPrenume || testEmail || testGender || testPasswordTwe;

    setErrName(testName ? `${errorInputs.nameErr}` : null);
    setErrPrenume(testPrenume ? `${errorInputs.prenumeErr}` : null);
    setErrEmail(testEmail ? `${errorInputs.emailErr}` : null);
    setErrPassword(testPasswordTwe ? `${errorInputs.passwordErr}` : null);
    setErrCheckBox(!checkbox ? `${errorInputs.checkboxErr}` : null);

    if (anyError) return;

    if (!userEdit) {
      if (!checkbox) return;

      const uniq = String(new Date().getTime());
      const dataForm: UserProps = {
        name,
        prenume,
        email,
        gender,
        password,
        rol,
        _id: uniq,
      };

      onAddUser(dataForm);
      cancelModal();
    } else {
      const editUser: UserProps = {
        name,
        prenume,
        email,
        gender,
        rol,
        password,
        _id: userEdit._id,
      };
      onAddUser(editUser);
    }
  }

  return (
    <Modal
      typeBtn={type === "create" ? "Add a new user" : "Save"}
      openModal={modalOpen}
      onClose={cancelModal}
      onConfirm={addNewUser}
    >
      <Form onSendFn={addNewUser}>
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
          defaultValue={gender}
        />

        <Select
          name="rol"
          onChange={(e) => setRol(e.target.value)}
          options={["moderator", "administrator"]}
          defaultValue={rol}
        />

        {!userEdit && (
          <Checkbox
            type="checkbox"
            onChange={(e) => setCheckBox(e.target.checked)}
            label="I agree with the processing of personal data"
            id={"de-acord"}
            errorMsj={errCheckbox}
          />
        )}
      </Form>
    </Modal>
  );
};
