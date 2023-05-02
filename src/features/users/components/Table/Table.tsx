import { UserProps } from "types";

import { Button } from "components";

import "./style.scss";

interface UserPropsData {
  user: UserProps;
}

export const Table: React.FC<UserPropsData> = ({ user }) => {
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
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </div>
  );
};
