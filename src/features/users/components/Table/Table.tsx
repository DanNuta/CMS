import { UserProps } from "@/types";
import { Button } from "@/components";
import { DeleteImage, EditImage } from "@/icons";
import { useAuth } from "@/context";

interface UserPropsData {
  users?: UserProps[];
  onDelete: (user: UserProps) => void;
  onEdit: (user: UserProps) => void;
}

export const Table: React.FC<UserPropsData> = ({ users, onDelete, onEdit }) => {
  const { user } = useAuth();

  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>First name</td>
          <td>Email</td>
          <td>Gender</td>
          <td>Role</td>
          {user?.rol === "administrator" && <td>Action</td>}
        </tr>
      </thead>

      <tbody>
        {users &&
          users.map((u, i) => {
            return (
              <tr key={i}>
                <td>{u.name}</td>
                <td>{u.prenume}</td>
                <td>{u.email}</td>
                <td>{u.gender}</td>
                <td>{u.rol}</td>

                {user?.rol === "administrator" && (
                  <td>
                    <Button
                      type="neutral"
                      element="img"
                      dimension="default"
                      onClick={() => onDelete(u)}
                    >
                      <DeleteImage />
                    </Button>
                    <Button
                      type="neutral"
                      element="img"
                      dimension="default"
                      onClick={() => onEdit(u)}
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
