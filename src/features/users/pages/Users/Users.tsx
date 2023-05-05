import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getsUsers, deleteUser, updateUser, postUsers } from "../../../../api";
import { Button } from "../../../../components";
import { Table, UsersForm } from "../../components";
import { UserProps } from "../../../../types";
import { LogIn } from "../../../../context";
import { LogInUser } from "../../../../types";

export const Users = () => {
  const { user } = useContext(LogIn) as LogInUser;

  const [addUserModalState, setAddUserModalState] = useState(false);
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
  }

  function changeUserFn(data: UserProps) {
    const newData = { ...data, id: changeUser?.id };
    mutatePutUser(newData);
  }

  return (
    <div className="users">
      {isLoading && <h1>Loading...</h1>}

      <UsersForm
        onCancel={() => setAddUserModalState((prev) => !prev)}
        onAddUser={addNewUser}
        type="create"
        modalOpen={addUserModalState}
      />

      <UsersForm
        onCancel={() => setEditUserState((prev) => !prev)}
        onAddUser={changeUserFn}
        type="edit"
        modalOpen={editUserState}
        userEdit={changeUser}
      />

      <div className="users__header">
        <h1>Utilizatori</h1>

        <div>
          {user?.rol === "administrator" && (
            <Button
              type="primary"
              onClick={() => setAddUserModalState((prev) => !prev)}
            >
              Adauga utilizator
            </Button>
          )}
        </div>
      </div>

      <Table users={data} onEdit={editUser} onDelete={deleteUserFn} />

      <div className="list_users"></div>
    </div>
  );
};
