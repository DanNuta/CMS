import React, { PropsWithChildren } from "react";

interface FormProps {
  onSendFn?: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  dimension?: "custom-form";
}

export const Form: React.FC<PropsWithChildren<FormProps>> = ({
  onSendFn,
  title,
  children,
  dimension,
}) => {
  return (
    <form
      className={`form form--${dimension ? dimension : ""}`}
      onSubmit={onSendFn}
    >
      {title && <h1 className="form__title">{title}</h1>}
      {children}
    </form>
  );
};
