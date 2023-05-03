import { useEffect } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";

import { UserProps } from "types";
import { Button } from "../../../../components";
import Delete from "../../../../icons/delete.svg";
import Edit from "../../../../icons/edit.svg";
import { deleteUser } from "../../../../api";

interface UserPropsData {
  user: UserProps;
  onDelete: (id: number) => void;
}

export const Table: React.FC<UserPropsData> = ({ user, onDelete }) => {
  const queryClient = new QueryClient();

  const { data, mutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (data) => {
      queryClient.setQueryData(["users"], data);
      console.log(data);
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);
  console.log(data);

  function editUser(id: number) {
    console.log(id);
  }

  function deleteUserFn(id: number) {
    //onDelete(id);
    mutate(id);
  }

  return (
    <div className="card_row">
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
        <Button onClick={() => deleteUserFn(user.id)}>
          <img src={Delete} />
        </Button>
        <Button onClick={() => editUser(user.id)}>
          <img src={Edit} />
        </Button>
      </div>
    </div>
  );
};
