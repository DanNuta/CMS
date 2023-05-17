import React, { PropsWithChildren } from "react";

interface ButtonProps {
  onClick?: () => void;
  type: "danger" | "primary" | "neutral";
  dimension: "full" | "custom" | "default";
  element: "href" | "img" | "text";
  className?: string;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  type,
  dimension,
  element,
  className,
}) => {
  return (
    <button
      className={`btn btn--${type} btn--${dimension} ${className}`}
      onClick={onClick}
    >
      <div className={`btn__element btn__${element}`}>{children}</div>
    </button>
  );
};
