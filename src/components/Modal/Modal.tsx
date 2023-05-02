import React, { PropsWithChildren } from "react";

import { Button } from "../../components";

interface ModalProps {
  onCancel: () => void;
  onAdd?: () => void;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  onCancel,
}) => {
  return (
    <div className="modal">
      <div className="modal__children">
        {children}

        <div className="modal__btns">
          <Button onClick={onCancel}>Cancel</Button>
          <Button>Add</Button>
        </div>
      </div>
    </div>
  );
};
