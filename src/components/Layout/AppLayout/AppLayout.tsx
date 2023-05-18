import { Navigate, useOutlet } from "react-router-dom";

import { Topbar, Menu } from "@/components/Layout";
import { useAuth } from "@/context";
import { ROUTES_PATHS } from "@/routes";

export const AppLayout: React.FC = () => {
  const outlet = useOutlet();

  const { user } = useAuth();

  if (user === null) {
    return <Navigate to={`${ROUTES_PATHS.login}`} />;
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
