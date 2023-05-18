import React, { PropsWithChildren, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  butontype: "danger" | "primary" | "neutral";
  dimension: "full" | "custom" | "default";
  element: "href" | "img" | "text";
  className?: string;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onClick,
  children,
  dimension,
  element,
  butontype,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`btn btn--${butontype} btn--${dimension} ${props.className}`}
      onClick={onClick}
    >
      <div className={`btn__element btn__${element}`}>{children}</div>
    </button>
  );
};
