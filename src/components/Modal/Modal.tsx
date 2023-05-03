import React, { PropsWithChildren } from "react";

import { Button } from "../../components";

export const Modal: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__children">{children}</div>
    </div>
  );
};

export const ModalForm: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="form">
      <div className="form__modal">{children}</div>
    </div>
  );
};
