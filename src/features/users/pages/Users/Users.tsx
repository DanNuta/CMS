import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getsUsers } from "../../../../api";
import { Button } from "../../../../components";
import { Table, UserModalForm } from "../../components";
import { UserProps } from "../../../../types";

import "./style.scss";

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

      <div className="list_users">
        <div className="card_row">
          <span>Nume</span>
          <span>Prenume</span>
          <span>Email</span>
          <span>Gen</span>
          <span>Rol</span>
          <span>Action</span>
        </div>

        {data &&
          data.map((item, i) => {
            return <Table key={i} user={item} />;
          })}
      </div>
    </div>
  );
};
