import { useState } from "react";
import { createPortal } from "react-dom";

import { UserProps } from "types";
import { Button, ConfirmationModal } from "../../../../components";
import Delete from "../../../../icons/delete.svg";
import Edit from "../../../../icons/edit.svg";

interface UserPropsData {
  users?: UserProps[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

export const Table: React.FC<UserPropsData> = ({ users, onDelete, onEdit }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [idDelete, setIdDelete] = useState<null | number>(null);

  // edit user
  function editUser(id: number) {
    onEdit(id);
  }

  // delete user
  function deleteUser(id: number) {
    setConfirmation((prev) => !prev);
    setIdDelete(id);
  }

  return (
    <>
      {confirmation &&
        createPortal(
          <ConfirmationModal
            onDelete={() => {
              onDelete(idDelete!);
              setConfirmation((prev) => !prev);
            }}
            onCancel={() => setConfirmation((prev) => !prev)}
          />,
          document.body
        )}

      <div className="card_row">
        <span>Nume</span>
        <span>Prenume</span>
        <span>Email</span>
        <span>Gen</span>
        <span>Rol</span>
        <span>Action</span>
      </div>

      {users &&
        users.map((user, i) => {
          return (
            <div key={i} className="card_row">
              <div className="card_name card_col">
                <h1>{user.name}</h1>
              </div>
              <div className="card_prenume card_col">
                <p>{user.prenume}</p>
              </div>
              <div className="card_email card_col">
                <p>{user.email}</p>
              </div>
              <div className="card_gender card_col">
                <p>{user.gender}</p>
              </div>
              <div className="card_role card_col">
                <p>{user.rol}</p>
              </div>

              <div className="card_edit_delete card_col">
                <Button onClick={() => deleteUser(user.id!)}>
                  <img src={Delete} />
                </Button>
                <Button onClick={() => editUser(user.id!)}>
                  <img src={Edit} />
                </Button>
              </div>
            </div>
          );
        })}
    </>
  );
};
