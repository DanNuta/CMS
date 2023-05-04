import React, { PropsWithChildren } from "react";

export const UserModalForm: React.FC<PropsWithChildren> = ({ children }) => {
  // state

  return (
    <div className="modal">
      <div className="modal__children">{children}</div>
    </div>
  );
};
