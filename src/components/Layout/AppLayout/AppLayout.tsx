import { useOutlet } from "react-router-dom";

import { Topbar, Menu } from "@/components/Layout";

export const AppLayout: React.FC = () => {
  const outlet = useOutlet();

  return (
    <div className="app-layout">
      <div>
        <Topbar />
      </div>

      <div className="app-layout__content">
        <Menu />
        {outlet}
      </div>
    </div>
  );
};
