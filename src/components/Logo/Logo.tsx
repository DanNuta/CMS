import { NavLink } from "react-router-dom";

import { ROUTES_PATHS } from "@/routes";

export const Logo = () => {
  return (
    <div className="logo">
      <NavLink className="logo__link" to={`${ROUTES_PATHS.users}`}>
        <h1 className="logo__title">Dashboard</h1>
      </NavLink>
    </div>
  );
};
