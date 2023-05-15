import { Navigate, useOutlet } from "react-router-dom";

import { Topbar, Menu } from "@/components/Layout";
import { useAuth } from "@/context";
import { ROUTES_PATHS } from "@/routes";

export const AppLayout: React.FC = () => {
  const outlet = useOutlet();
  const auth = useAuth();

  if (auth?.user === null) {
    return <Navigate to={`${ROUTES_PATHS.login}`} />;
  }

  return (
    <div className="app-layout">
      <div>
        <Menu />
      </div>

      <div className="content">
        <Topbar />
        {outlet}
      </div>
    </div>
  );
};
