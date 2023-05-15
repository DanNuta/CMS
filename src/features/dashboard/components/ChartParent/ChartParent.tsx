import { PropsWithChildren } from "react";

interface ChartProps {
  dataLength?: number;
  title: string;
}

export const ChartParent: React.FC<PropsWithChildren<ChartProps>> = ({
  children,
  dataLength,
  title,
}) => {
  return (
    <div className="chart">
      <h1>
        {title}: {dataLength}
      </h1>
      {children}
    </div>
  );
};
