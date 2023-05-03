import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";

import { getsUsers, deleteUser, getUser } from "../../../../api";
import { Button, Modal } from "../../../../components";
import { Table, UserModalForm } from "../../components";
import { UserProps } from "../../../../types";

export const Users = () => {
  const [addUser, setAddUser] = useState(false);
  const [editUserState, setEditUserState] = useState(false);
  const [userId, setUserId] = useState<number>(1);

  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["users"] });

  const { data, isLoading } = useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: getsUsers,
  });

  const { mutate } = useMutation({
    mutationFn: deleteUser,
  });

  function deleteUserFn(id: number) {
    mutate(id);
  }

  function editUser(id: number) {
    setEditUserState((prev) => !prev);
    console.log(data);
  }

  return (
    <div className="users">
      {isLoading && <h1>Loading...</h1>}

      {addUser &&
        createPortal(
          <Modal>
            <UserModalForm
              onCancel={() => setAddUser((prev) => !prev)}
              onAddUser={() => console.log("click")}
            />
          </Modal>,
          document.body
        )}

      {editUserState && <h1>Edit</h1>}

      <div className="users__header">
        <h1>Utilizatori</h1>

        <div>
          <Button type="primary" onClick={() => setAddUser((prev) => !prev)}>
            Adauga utilizator
          </Button>
        </div>
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
            return (
              <Table
                key={i}
                user={item}
                onEdit={editUser}
                onDelete={deleteUserFn}
              />
            );
          })}
      </div>
    </div>
  );
};
