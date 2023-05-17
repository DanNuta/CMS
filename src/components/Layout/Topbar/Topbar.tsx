import { useState } from "react";

import { useAuth } from "@/context";
import { ArrowDown, ArrowUp } from "@/icons";
import { Button, Logo } from "@/components";

export const Topbar = () => {
  const { logOut, user } = useAuth();

  const [showLogOut, setShowLogOut] = useState(false);

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
            {showLogOut ? <ArrowUp /> : <ArrowDown />}
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
