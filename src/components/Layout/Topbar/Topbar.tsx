import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserContextType } from "@/types";
import { UserContext } from "@/context";
import { ROUTES_PATHS } from "@/routes";
import { ArrowDown } from "@/icons";
import { Button, Logo } from "@/components";

export const Topbar = () => {
  const { user, setUserState } = useContext(UserContext) as UserContextType;
  const location = useNavigate();

  const [showLogOut, setShowLogOut] = useState(false);

  function logOut() {
    localStorage.clear();
    setUserState(null);
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
      <Logo />

      <div className="top-bar__header-wrapper">
        <h1 className="top-bar__title">{user?.name}</h1>
        <h1 className="top-bar__title">{user?.prenume}</h1>

        <div className="btn-arrow">
          <Button
            type="neutral"
            element="img"
            dimension="default"
            onClick={() => setShowLogOut((prev) => !prev)}
          >
            <ArrowDown />
          </Button>
        </div>

        {showLogOut && (
          <div className="top-bar__log-out">
            <Button
              element="text"
              dimension="custom"
              type="danger"
              onClick={logOut}
            >
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
