import { useState, useRef, useEffect } from "react";

import { useAuth } from "@/context";
import { ArrowDown, ArrowUp } from "@/icons";
import { Button, Logo } from "@/components";

export const Topbar = () => {
  const { logOut, user } = useAuth();

  const ref = useRef<HTMLDivElement | null>(null);

  const [showLogOut, setShowLogOut] = useState(false);

  return (
    <div className="top-bar">
      <Logo />

      <div
        onClick={() => setShowLogOut((prev) => !prev)}
        className="top-bar__header-wrapper"
      >
        <h1 className="top-bar__title">{user?.name}</h1>
        <h1 className="top-bar__title">{user?.prenume}</h1>

        <div className="btn-arrow">
          <Button butontype="neutral" element="img" dimension="default">
            {showLogOut ? <ArrowUp /> : <ArrowDown />}
          </Button>
        </div>

        {showLogOut && (
          <div ref={ref} className="top-bar__log-out">
            <Button
              element="text"
              dimension="custom"
              butontype="danger"
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
