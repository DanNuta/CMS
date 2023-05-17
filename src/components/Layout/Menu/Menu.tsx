import { useEffect, useState } from "react";

import {
  UserImage,
  PostImage,
  DashboardImage,
  ArrowLeft,
  ArrowRight,
} from "@/icons";
import { ROUTES_PATHS } from "@/routes";
import { Link, Button } from "@/components";

export const Menu = () => {
  const [mobileMod, setMobileMod] = useState(true);

  useEffect(() => {
    const localDataMenu = localStorage.getItem("menu");
    if (localDataMenu !== null) {
      const local = localDataMenu === "true";
      setMobileMod(local);
    }
  }, []);

  function togglemenu() {
    setMobileMod((prev) => {
      const stateValue = !prev;
      localStorage.setItem("menu", stateValue.toString());
      return !prev;
    });
  }

  return (
    <div
      className={`menu-wrapper menu-wrapper--${
        mobileMod ? "mobile" : "desktop"
      }`}
    >
      <nav className="menu-wrapper__navigation">
        <ul className="menu-wrapper__items">
          <li className="menu-wrapper__item">
            <Link
              title="Users"
              img={<UserImage />}
              mobileMod={mobileMod}
              route={ROUTES_PATHS.users}
            />
          </li>

          <li className="menu-wrapper__item">
            <Link
              title="Posts"
              route={ROUTES_PATHS.posts}
              mobileMod={mobileMod}
              img={<PostImage />}
            />
          </li>

          <li className="menu-wrapper__item">
            <Link
              title="Dashboard"
              route={ROUTES_PATHS.dashboard}
              mobileMod={mobileMod}
              img={<DashboardImage />}
            />
          </li>
        </ul>
      </nav>

      <hr />

      <div className="menu-wrapper__toggle-nav">
        <Button
          type="neutral"
          element="img"
          dimension="default"
          onClick={togglemenu}
        >
          {mobileMod ? <ArrowRight /> : <ArrowLeft />}
        </Button>
      </div>
    </div>
  );
};
