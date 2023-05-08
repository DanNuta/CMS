import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "danger" | "primary";
  dimension?: "full" | "custom" | "none";
  element?: "href";
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  disabled,
  children,
  type,
  dimension,
  element,
}) => {
  const typeChildren = typeof children;

  return (
    <button
      className={`${typeChildren === "string" ? "text" : "img"} ${type} ${
        dimension ?? "custom"
      } ${element && element} text`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
