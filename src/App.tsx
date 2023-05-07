import "./styles/index.scss";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { ROUTES_PATHS } from "./routes";
import { Register, Login } from "./features/auth";
import { Menu, Topbar } from "./components";
import { LogIn } from "./context";
import { LogInUser } from "./types";
import { getUser } from "./api";
import { Users } from "./features/users/pages";
import { Posts, Create, Edit } from "./features/posts/pages";
import { Dashboard } from "./features/dashboard/pages";

function App() {
  const idLocalUser = Number(localStorage.getItem("userId"));
  const { user, changeUser } = useContext(LogIn) as LogInUser;

  if (idLocalUser) {
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

          <Route
            path={`${ROUTES_PATHS.posts}`}
            element={
              user ? <Posts /> : <Navigate to={`${ROUTES_PATHS.login}`} />
            }
          />

          <Route
            path={`${ROUTES_PATHS.postCreate}`}
            element={
              user ? <Create /> : <Navigate to={`${ROUTES_PATHS.login}`} />
            }
          />

          <Route
            path={`${ROUTES_PATHS.postIdEdit}`}
            element={
              user ? <Edit /> : <Navigate to={`${ROUTES_PATHS.login}`} />
            }
          />

          <Route
            path={`${ROUTES_PATHS.dashboard}`}
            element={
              user ? <Dashboard /> : <Navigate to={`${ROUTES_PATHS.login}`} />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
