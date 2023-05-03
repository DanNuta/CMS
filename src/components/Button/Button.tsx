import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  type?: "danger" | "primary";
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  disabled,
  children,
  type,
}) => {
  const typeChildren = typeof children;

  return (
    <button
      className={`${typeChildren === "string" ? "text" : "img"} ${type}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
