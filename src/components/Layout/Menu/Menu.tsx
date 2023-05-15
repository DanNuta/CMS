import { useState } from "react";
import { NavLink } from "react-router-dom";

import { UserImage, PostImage, DasnboardImage } from "@/icons";
import { ROUTES_PATHS } from "@/routes";

const commonClassName = "root__hover desktop-nav";

export const Menu = () => {
  const [mobileMod] = useState(false);

  return (
    <div className={`menu ${mobileMod ? "mobile" : "desktop"}`}>
      <div className="logo">
        <NavLink to={`${ROUTES_PATHS.users}`}>
          <h1>{mobileMod ? "Dsb" : "Dashboard"}</h1>
        </NavLink>
      </div>

      <div className={mobileMod ? "root mobile-root" : "root desktop-root"}>
        <NavLink to={`${ROUTES_PATHS.users}`}>
          {({ isActive }) => {
            return (
              <div
                className={
                  isActive ? ` active ${commonClassName}` : `${commonClassName}`
                }
              >
                <UserImage />
                {!mobileMod && <h4>Users</h4>}
              </div>
            );
          }}
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive ? `active` : "";
          }}
          to={`${ROUTES_PATHS.posts}`}
        >
          {({ isActive }) => (
            <div
              className={
                isActive ? ` active ${commonClassName}` : `${commonClassName}`
              }
            >
              <PostImage />
              {!mobileMod && <h4>Posts</h4>}
            </div>
          )}
        </NavLink>

        <NavLink to={`${ROUTES_PATHS.dashboard}`}>
          {({ isActive }) => {
            return (
              <div
                className={
                  isActive ? ` active ${commonClassName}` : `${commonClassName}`
                }
              >
                <DasnboardImage />
                {!mobileMod && <h4>Dashboard</h4>}
              </div>
            );
          }}
        </NavLink>
      </div>
    </div>
  );
};
