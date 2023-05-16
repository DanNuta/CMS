import { NavLink } from "react-router-dom";

import { ROUTES_PATHS } from "@/routes";

export const Logo = () => {
  return (
    <div className="menu__logo">
      <NavLink className="menu__logo--link" to={`${ROUTES_PATHS.users}`}>
        <h1>Dashboard</h1>
      </NavLink>
    </div>
  );
};
