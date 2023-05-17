import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getsUsers, deleteUser, updateUser, postUsers } from "@/api";
import { Button, Modal, PopUp, PageCard, Loading } from "@/components";
import { Table, UsersForm } from "@/features/users/components";
import { UserProps } from "@/types";
import { useAuth } from "@/context";

import { succesMsj, confirmMjs } from "@/utils";

export const Users = () => {
  const { user } = useAuth();

  const [addUserModalState, setAddUserModalState] = useState(false);
  const [editUserState, setEditUserState] = useState(false);
  const [deleteUserState, setDeleteUserState] = useState(false);

  const [changeUser, setChangeUser] = useState<UserProps | undefined>();
  const [idDelete, setIdDelete] = useState<UserProps | undefined>();

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery<UserProps[]>(["users"], getsUsers);

  const { mutate: mutateDeleteUser, status: statusDelete } = useMutation({
    mutationFn: deleteUser,

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const { mutate: mutatePostUser, status: statusPostUser } = useMutation({
    mutationFn: postUsers,

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const { mutate: mutatePutUser, status: statusEdit } = useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // ---------------- useQuery -------------------------------------------

  function addNewUser(userAdd: UserProps) {
    mutatePostUser(userAdd);
  }

  // delete user
  function deleteUserFn(data: UserProps) {
    console.log(data);
    setDeleteUserState(true);
    setIdDelete(data);
  }

  function confirmDeleteUser() {
    if (idDelete === undefined) return;
    setDeleteUserState(false);
    mutateDeleteUser(idDelete.id);
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

  const btnAdmin = user?.rol === "administrator" && (
    <Button
      element="text"
      dimension="custom"
      type="primary"
      onClick={() => setAddUserModalState(true)}
    >
      Add a new user
    </Button>
  );

  return (
    <PageCard title="Users" extra={btnAdmin}>
      <UsersForm
        onCancel={() => setAddUserModalState((prev) => !prev)}
        onAddUser={addNewUser}
        type="create"
        modalOpen={addUserModalState}
      />

      <Modal
        typeBtn="Confirm"
        openModal={deleteUserState}
        onClose={() => setDeleteUserState(false)}
        onConfirm={confirmDeleteUser}
      >
        <h1>{confirmMjs.confirmDeleteUser}</h1>
      </Modal>

      <UsersForm
        onCancel={() => setEditUserState(false)}
        onAddUser={editUserOnServer}
        type="edit"
        modalOpen={editUserState}
        userEdit={changeUser}
      />

      {statusDelete === "success" && (
        <PopUp type="succes">{succesMsj.succesDeleteUser}</PopUp>
      )}

      {statusPostUser === "success" && (
        <PopUp type="succes">{succesMsj.succesAddUser}</PopUp>
      )}

      {statusEdit === "success" && (
        <PopUp type="succes">{succesMsj.succesEditUser}</PopUp>
      )}

      {isLoading ? (
        <Loading />
      ) : (
        <Table users={data} onEdit={editUser} onDelete={deleteUserFn} />
      )}
    </PageCard>
  );
};
