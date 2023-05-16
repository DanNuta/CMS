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
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.prenume}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.rol}</td>

                {userContext?.rol === "administrator" && (
                  <td>
                    <Button
                      type="neutral"
                      element="img"
                      dimension="default"
                      onClick={() => onDelete(user)}
                    >
                      <DeleteImage />
                    </Button>
                    <Button
                      type="neutral"
                      element="img"
                      dimension="default"
                      onClick={() => onEdit(user)}
                    >
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
