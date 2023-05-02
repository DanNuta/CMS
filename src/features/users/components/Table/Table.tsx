import { UserProps } from "../../../../types";

import { Button } from "../../../../components";

interface UserPropsData {
  user: UserProps;
}

export const Table: React.FC<UserPropsData> = ({ user }) => {
  console.log(user);

  return <div>table</div>;
};
