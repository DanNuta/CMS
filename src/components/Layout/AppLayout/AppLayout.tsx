import { PropsWithChildren, useContext } from "react";

import { Topbar, Menu } from "@/components/Layout";
import { UserContext } from "@/context";
import { UserContextType } from "@/types";

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
