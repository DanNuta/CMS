import { PropsWithChildren, useState } from "react";
import { createPortal } from "react-dom";

interface PopUpProps {
  type: "fail" | "succes";
}

export const PopUp: React.FC<PropsWithChildren<PopUpProps>> = ({
  children,
  type,
}) => {
  const [openPopUp, setOpenPopUp] = useState(true);

  setTimeout(() => {
    setOpenPopUp(false);
  }, 3000);

  return (
    <>
      {openPopUp &&
        createPortal(
          <div className={`pop-up pop-up--${type}`}>{children}</div>,
          document.body
        )}
    </>
  );
};
