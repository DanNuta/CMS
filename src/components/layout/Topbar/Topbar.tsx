import { useContext } from "react";

import { LogInUser } from "types";
import { LogIn } from "../../../context";
import { Button } from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes";

export const Topbar = () => {
  const { user, changeUser } = useContext(LogIn) as LogInUser;
  const location = useNavigate();

  function logOut() {
    const idLocal = localStorage.removeItem("userId");
    changeUser();
    location(`${ROUTES_PATHS.login}`);
  }

  return (
    <div className="top-bar">
      <h1>{user?.name}</h1>
      <h1>{user?.prenume}</h1>

      <Button onClick={logOut} type="danger">
        Log out
      </Button>
    </div>
  );
};
