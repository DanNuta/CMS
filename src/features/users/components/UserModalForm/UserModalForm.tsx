import { Form, Input, Button, Select, Checkbox } from "../../../../components";

export const UserModalForm = () => {
  return (
    <Form onSendFn={() => console.log("fsdfsd")}>
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

      <Button title="Add new user" />
    </Form>
  );
};
