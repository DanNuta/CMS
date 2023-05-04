import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createPortal } from "react-dom";

import { getsUsers, deleteUser, updateUser, postUsers } from "../../../../api";
import { Button } from "../../../../components";
import { Table, EditUser, AddNewUser } from "../../components";
import { UserProps } from "../../../../types";

export const Users = () => {
  const [addUser, setAddUser] = useState(false);
  const [editUserState, setEditUserState] = useState(false);
  const [changeUser, setChangeUser] = useState<UserProps | undefined>();

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["users"] });

  const { data, isLoading } = useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: getsUsers,
  });

  const { mutate: mutateDeleteUser } = useMutation({
    mutationFn: deleteUser,
  });

  const { mutate: mutatePostUser } = useMutation({
    mutationFn: postUsers,
  });

  const { mutate: mutatePutUser } = useMutation({
    mutationFn: updateUser,
  });

  function addNewUser(data: UserProps) {
    mutatePostUser(data);
  }

  // delete user

  function deleteUserFn(id: number) {
    mutateDeleteUser(id);
  }

  // edit user

  function editUser(id: number) {
    setEditUserState((prev) => !prev);
    const findUser = data?.find((item) => item.id === id);

    setChangeUser(findUser);
    console.log(findUser);
  }

  function changeUserFn(data: UserProps) {
    const newData = { ...data, id: changeUser?.id };
    mutatePutUser(newData);
  }

  return (
    <div className="users">
      {isLoading && <h1>Loading...</h1>}

      {addUser &&
        createPortal(
          <AddNewUser
            onCancel={() => setAddUser((prev) => !prev)}
            onAddUser={addNewUser}
          />,
          document.body
        )}

      {editUserState &&
        createPortal(
          <EditUser
            onCancel={() => setEditUserState((prev) => !prev)}
            onEditUser={changeUserFn}
            user={changeUser}
          />,
          document.body
        )}

      <div className="users__header">
        <h1>Utilizatori</h1>

        <div>
          <Button type="primary" onClick={() => setAddUser((prev) => !prev)}>
            Adauga utilizator
          </Button>
        </div>
      </div>

      <Table users={data} onEdit={editUser} onDelete={deleteUserFn} />

      <div className="list_users"></div>
    </div>
  );
};
