import { useOutlet } from "react-router-dom";

import { Topbar, Menu } from "@/components/Layout";

export const AppLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <div className="app-layout">
      <div>
        <Menu />
      </div>

      <div className="content">
        <Topbar />
        {outlet}
      </div>
    </div>
  );
};
