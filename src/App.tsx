import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ROUTES_PATHS, navigateToPost } from "./routes";
import { Users, Register, Login } from "./features/auth";
import { Menu, Topbar } from "./components";
import { LogIn } from "./context";
import { LogInUser } from "./types";
import { getUser } from "./api";

function App() {
  const idLocalUser = Number(localStorage.getItem("userId"));
  const { user, changeUser } = useContext(LogIn) as LogInUser;

  if (idLocalUser) {
    console.log("if");
    const { data } = useQuery({
      queryKey: ["userLogIn", idLocalUser],
      queryFn: () => getUser(idLocalUser),
    });

    changeUser(data);
  }

  return (
    <div className="app">
      {user && (
        <div>
          <Menu />
        </div>
      )}

      <div className="content">
        {user && <Topbar />}

        <Routes>
          <Route
            path={`${ROUTES_PATHS.login}`}
            element={
              user ? <Navigate to={`${ROUTES_PATHS.users}`} /> : <Login />
            }
          />
          <Route
            index
            path={`${ROUTES_PATHS.register}`}
            element={
              user ? <Navigate to={`${ROUTES_PATHS.users}`} /> : <Register />
            }
          />

          <Route
            path={`${ROUTES_PATHS.users}`}
            element={
              user ? <Users /> : <Navigate to={`${ROUTES_PATHS.login}`} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
