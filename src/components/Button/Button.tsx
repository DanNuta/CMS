import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  disabled,
  children,
}) => {
  const typeChildren = typeof children;

  return (
    <button
      className={typeChildren === "string" ? "text" : "img"}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
