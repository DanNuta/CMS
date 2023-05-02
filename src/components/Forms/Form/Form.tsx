import React, { PropsWithChildren } from "react";

import "./style.scss";

interface FormProps {
  onSendFn: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
}

export const Form: React.FC<PropsWithChildren<FormProps>> = ({
  onSendFn,
  title,
  children,
}) => {
  return (
    <div className="form">
      <form onSubmit={onSendFn}>
        {title && <h1>{title}</h1>}

        {children}
      </form>
    </div>
  );
};
