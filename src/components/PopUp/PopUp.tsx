import { PropsWithChildren } from "react";

interface PopUpProps {
  type: "danger" | "primary";
}

export const PopUp: React.FC<PropsWithChildren<PopUpProps>> = ({
  children,
  type,
}) => {
  return <div className={`${type} pop-up`}>{children}</div>;
};
