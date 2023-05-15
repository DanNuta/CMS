import { useContext } from "react";

import { UserProps, UserContextType } from "@/types";
import { Button } from "@/components";
import { DeleteImage, EditImage } from "@/icons";
import { UserContext } from "@/context";

interface UserPropsData {
  users?: UserProps[];
  onDelete: (user: UserProps) => void;
  onEdit: (user: UserProps) => void;
}

export const Table: React.FC<UserPropsData> = ({ users, onDelete, onEdit }) => {
  const { user: userContext } = useContext(UserContext) as UserContextType;

  return (
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
                    <Button dimension="none" onClick={() => onDelete(user)}>
                      <DeleteImage />
                    </Button>
                    <Button onClick={() => onEdit(user)}>
                      <EditImage />
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
