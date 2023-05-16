import { PropsWithChildren, ReactNode } from "react";

interface HeaderProps {
  title?: string;
  extra?: ReactNode;
}
export const PageCard: React.FC<PropsWithChildren<HeaderProps>> = ({
  children,
  title,
  extra,
}) => {
  return (
    <div className="header">
      <div className="header__title">
        <h1>{title}</h1>
        {extra && extra}
      </div>

      {children}
    </div>
  );
};
