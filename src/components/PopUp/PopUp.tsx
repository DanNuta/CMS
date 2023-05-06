import { PropsWithChildren, useEffect, useState } from "react";

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

  return <>{openPopUp && <div className={`${type} pop-up`}>{children}</div>}</>;
};
