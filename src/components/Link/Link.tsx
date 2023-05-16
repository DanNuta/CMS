import { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface LinkProps {
  mobileMod: boolean;
  img: React.ReactNode;
  route: string;
  title: string;
}

export const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  mobileMod,
  img,
  route,
  title,
}) => {
  return (
    <NavLink className={`link-item`} to={`${route}`}>
      {({ isActive }) => {
        return (
          <div
            className={`link-item__icon-title link-item__icon-title--${
              mobileMod ? "mobile" : "desktop"
            } ${isActive && `link-item__icon-title--active`}`}
          >
            {img}
            {!mobileMod && <h4 className="icon-title__title">{title}</h4>}
          </div>
        );
      }}
    </NavLink>
  );
};
