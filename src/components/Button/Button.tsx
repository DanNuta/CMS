import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "danger" | "primary";
  dimension?: "full" | "custom";
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  disabled,
  children,
  type,
  dimension,
}) => {
  const typeChildren = typeof children;

  return (
    <button
      className={`${typeChildren === "string" ? "text" : "img"} ${type} ${
        dimension ?? "custom"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
