import { PropsWithChildren, useContext } from "react";

import { Menu } from "../Menu/Menu";
import { Topbar } from "../Topbar/Topbar";
import { UserContext } from "../../../context";
import { UserContextType } from "types";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div className="app-layout">
      {user && (
        <div>
          <Menu />
        </div>
      )}

      <div className="content">
        {user && <Topbar />}
        {children}
      </div>
    </div>
  );
};
