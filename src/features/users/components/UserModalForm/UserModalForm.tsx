import React, { useState } from "react";
import { Form, Input, Button, Select, Checkbox } from "../../../../components";

interface ModalProps {
  onCancel: () => void;
  onAddUser: () => void;
}

export const UserModalForm: React.FC<ModalProps> = ({
  onCancel,
  onAddUser,
}) => {
  const [nume, setNume] = useState("");
  const [errNume, setErrNume] = useState("");

  const [prenume, setPrenume] = useState("");
  const [errPrenume, setrrPrenume] = useState("");

  function addNewUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <Form onSendFn={(e) => addNewUser(e)}>
      <Input
        type="text"
        placeholder="Nume"
        errorMsj=""
        onChange={() => console.log("click")}
      />

      <Input
        type="text"
        placeholder="Prenume"
        errorMsj=""
        onChange={() => console.log("click")}
      />

      <Input
        type="email"
        placeholder="Email"
        errorMsj=""
        onChange={() => console.log("click")}
      />

      <Select
        errorMsj=""
        name="gen"
        onChange={() => console.log("click")}
        options={["Masculin", "Femenin", "Ma abtin"]}
      />

      <Select
        errorMsj=""
        name="gen"
        onChange={() => console.log("click")}
        options={["Moderator", "Aministrator"]}
      />

      <Checkbox
        label={"Sunt deacord cu prelucrarea datelor personale"}
        type={"checkbox"}
        id="user"
        errorMsj={null}
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
