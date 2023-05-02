import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getsUsers } from "../../../../api";
import { Button } from "../../../../components";

import "./style.scss";
import { Table, UserModalForm } from "../../components";
import { UserProps } from "../../../../types";

export const Users = () => {
  const [addUser, setAddUser] = useState(false);

  const { data, isLoading } = useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: getsUsers,
  });

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}

      {addUser && <UserModalForm />}

      <div>
        <h1>Utilizatori</h1>

        <Button
          title="Adauga utilizator"
          onClick={() => setAddUser((prev) => !prev)}
        />
      </div>

      {data &&
        data.map((item) => {
          return <Table user={item} />;
        })}
    </div>
  );
};
