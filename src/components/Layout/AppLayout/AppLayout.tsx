import { Navigate, useOutlet } from "react-router-dom";

import { Topbar, Menu } from "@/components/Layout";
import { PropsWithChildren } from "react";
import { useAuth } from "@/context";

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const outlet = useOutlet();

  const { user } = useAuth();

  if (user === null) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-layout">
      <div>
        <Topbar />
      </div>

      <div className="app-layout__content">
        <Menu />
        {outlet}
      </div>
    </div>
  );
};
