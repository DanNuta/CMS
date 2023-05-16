import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  type: "danger" | "primary" | "neutral";
  dimension: "full" | "custom" | "default";
  element: "href" | "img" | "text";
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  type,
  dimension,
  element,
}) => {
  return (
    <button className={`btn btn--${type} btn--${dimension}`} onClick={onClick}>
      <div className={`btn__${element}`}>{children}</div>
    </button>
  );
};
