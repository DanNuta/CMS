import { useContext, useState } from "react";

import { LogInUser } from "types";
import { LogIn } from "../../../context";
import { Button } from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "../../../routes";
import arrow from "../../../icons/arrowDown.svg";

export const Topbar = () => {
  const { user, changeUser } = useContext(LogIn) as LogInUser;
  const location = useNavigate();

  const [showLogOut, setShowLogOut] = useState(false);

  function logOut() {
    localStorage.clear();

    changeUser();
    location(`${ROUTES_PATHS.login}`);
  }

  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.closest(".btn-arrow")) {
      setShowLogOut(true);
    } else {
      if (showLogOut) {
        setShowLogOut(false);
      }
    }
  });

  return (
    <div className="top-bar">
      <div className="parent-element">
        <h1>{user?.name}</h1>
        <h1>{user?.prenume}</h1>

        <div className="btn-arrow">
          <Button onClick={() => setShowLogOut((prev) => !prev)}>
            <img src={arrow}></img>
          </Button>
        </div>

        {showLogOut && (
          <div className="log-out">
            <Button onClick={logOut} type="danger">
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
