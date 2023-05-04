import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";

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
  return (
    <>
      {openModal &&
        createPortal(
          <div className="modal">
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
  return (
    <div className="form">
      <div className="form__modal">{children}</div>
    </div>
  );
};
