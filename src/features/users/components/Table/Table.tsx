import { useState, useContext } from "react";

import { UserProps, LogInUser } from "../../../../types";
import { Button, Modal } from "../../../../components";
import Delete from "../../../../icons/delete.svg";
import Edit from "../../../../icons/edit.svg";
import { LogIn } from "../../../../context";

interface UserPropsData {
  users?: UserProps[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const Table: React.FC<UserPropsData> = ({ users, onDelete, onEdit }) => {
  const { user: userContext } = useContext(LogIn) as LogInUser;

  const [modalOpen, setConfirmation] = useState(false);
  const [idDelete, setIdDelete] = useState<null | number>(null);

  // edit user
  function editUser(id?: number) {
    id && onEdit(id);
  }

  // delete user
  function deleteUser(id?: number) {
    if (!id) return;
    setConfirmation(true);
    setIdDelete(id);
  }

  return (
    <>
      <Modal
        typeBtn="Confirm"
        openModal={modalOpen}
        onClose={() => setConfirmation(false)}
        onConfirm={() => {
          onDelete(idDelete!);
          setConfirmation(false);
        }}
      >
        <h1>Sigur Doresti sa stergi acest user</h1>
      </Modal>

      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Prenume</td>
            <td>Email</td>
            <td>Gen</td>
            <td>Rol</td>
            {userContext?.rol === "administrator" && <td>Action</td>}
          </tr>
        </thead>

        <tbody>
          {users &&
            users.map((user, i) => {
              return (
                <tr key={i} className="card_name card_col">
                  <td className="card_name card_col">{user.name}</td>
                  <td className="card_prenume card_col">{user.prenume}</td>
                  <td className="card_email card_col">{user.email}</td>
                  <td className="card_gender card_col">{user.gender}</td>
                  <td className="card_role card_col">{user.rol}</td>

                  {userContext?.rol === "administrator" && (
                    <td className="card_edit_delete card_col">
                      <Button
                        dimension="none"
                        onClick={() => deleteUser(user.id)}
                      >
                        <img src={Delete} />
                      </Button>
                      <Button onClick={() => editUser(user.id)}>
                        <img src={Edit} />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};
