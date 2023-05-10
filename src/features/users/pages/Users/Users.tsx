import { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getsUsers, deleteUser, updateUser, postUsers } from "../../../../api";
import { Button, Modal } from "../../../../components";
import { Table, UsersForm } from "../../components";
import { UserProps } from "../../../../types";
import { LogIn } from "../../../../context";
import { LogInUser } from "../../../../types";

export const Users = () => {
  const { user } = useContext(LogIn) as LogInUser;

  const [addUserModalState, setAddUserModalState] = useState(false);
  const [editUserState, setEditUserState] = useState(false);
  const [deleteUserState, setDeleteUserState] = useState(false);

  const [changeUser, setChangeUser] = useState<UserProps | undefined>();
  const [idDelete, setIdDelete] = useState<UserProps | undefined>();

  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["users"] });

  const { data, isLoading } = useQuery<UserProps[]>({
    queryKey: ["users"],
    queryFn: getsUsers,
  });

  const { mutate: mutateDeleteUser } = useMutation<UserProps[]>({
    mutationFn: () => deleteUser(idDelete?.id),
  });

  const { mutate: mutatePostUser } = useMutation({
    mutationFn: postUsers,
  });

  const { mutate: mutatePutUser } = useMutation({
    mutationFn: updateUser,
  });

  // ---------------- useQuery -------------------------------------------

  function addNewUser(data: UserProps) {
    mutatePostUser(data);
    setAddUserModalState(false);
  }

  // delete user
  function deleteUserFn(data: UserProps) {
    setDeleteUserState(true);
    setIdDelete(data);
  }

  function confirmDeleteUser() {
    setDeleteUserState(false);
    mutateDeleteUser();
  }

  // edit user
  function editUser(editUser: UserProps) {
    const findUser = data?.find((item) => item.id === editUser.id);
    setEditUserState(true);
    setChangeUser(findUser);
  }

  function editUserOnServer(data: UserProps) {
    setEditUserState(false);
    mutatePutUser(data);
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

      {/* delete user */}

      <Modal
        typeBtn="Confirm"
        openModal={deleteUserState}
        onClose={() => setDeleteUserState(false)}
        onConfirm={confirmDeleteUser}
      >
        <h1>Sigur Doresti sa stergi acest user</h1>
      </Modal>

      {/* edit user */}

      <UsersForm
        onCancel={() => setEditUserState(false)}
        onAddUser={editUserOnServer}
        type="edit"
        modalOpen={editUserState}
        userEdit={changeUser}
      />

      <div className="users__header">
        <h1>Utilizatori</h1>

        <div>
          {user?.rol === "administrator" && (
            <Button type="primary" onClick={() => setAddUserModalState(true)}>
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
