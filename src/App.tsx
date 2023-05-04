import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";

import { ROUTES_PATHS, navigateToPost } from "./routes";
import { Users } from "./features/auth";
import { Login } from "./features/auth";
import { Register } from "./features/auth";
import { Menu } from "./components";

function App() {
  return (
    <div className="app">
      <Menu />

      <Routes>
        <Route path={`${ROUTES_PATHS.login}`} element={<Login />} />
        <Route path={`${ROUTES_PATHS.register}`} element={<Register />} />
        <Route path={`${ROUTES_PATHS.users}`} element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
