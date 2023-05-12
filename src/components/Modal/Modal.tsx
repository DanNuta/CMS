import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/Button";

interface ModalProps {
  onClose: () => void;
  onConfirm: (e?: any) => void;
  openModal: boolean;
  typeBtn: string;
}

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  children,
  openModal,
  onClose,
  onConfirm,
  typeBtn,
}) => {
  function closeModal(e: React.MouseEvent<HTMLDivElement>) {
    const value = e.target as HTMLDivElement;

    if (value.matches(".modal")) {
      onClose();
    }
  }

  return (
    <>
      {openModal &&
        createPortal(
          <div onClick={closeModal} className="modal">
            <div className="modal__children">
              {children}

              <div className="modal__btns">
                <Button onClick={onClose} type="danger">
                  Cancel
                </Button>
                <Button onClick={onConfirm} type="primary">
                  {typeBtn}
                </Button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")!
        )}
    </>
  );
};

export const ModalForm: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="modal">{children}</div>;
};
