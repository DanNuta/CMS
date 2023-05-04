import { useState } from "react";
import { Link } from "react-router-dom";

import posts from "../../../icons/posts.svg";
import dashboard from "../../../icons/dashboard.svg";
import users from "../../../icons/users.svg";

import { ROUTES_PATHS } from "../../../routes";

export const Menu = () => {
  const [mobileMod, setMobileMod] = useState(false);

  return (
    <div
      // onClick={() => setMobileMod((prev) => !prev)}
      className={`menu ${mobileMod ? "mobile" : "desktop"}`}
    >
      <div className="logo">
        <h1>{mobileMod ? "Dsb" : "Dashboard"}</h1>
      </div>

      <div className={mobileMod ? "root mobile-root" : "root desktop-root"}>
        <Link to={`${ROUTES_PATHS.users}`}>
          <div
            className={
              mobileMod ? "mobile-nav root__hover" : "desktop-nav root__hover"
            }
          >
            <img src={users} alt="" />
            {!mobileMod && <h4>Users</h4>}
          </div>
        </Link>

        <Link to={`${ROUTES_PATHS.posts}`}>
          <div
            className={
              mobileMod ? "mobile-nav root__hover" : "desktop-nav root__hover"
            }
          >
            <img src={posts} alt="" />

            {!mobileMod && <h4>Posts</h4>}
          </div>
        </Link>

        <Link to={`${ROUTES_PATHS.dashboard}`}>
          <div
            className={
              mobileMod ? "mobile-nav root__hover" : "desktop-nav root__hover"
            }
          >
            <img src={dashboard} alt="" />
            {!mobileMod && <h4>Dashboard</h4>}
          </div>
        </Link>
      </div>
    </div>
  );
};
