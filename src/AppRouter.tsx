import "./styles/index.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { ROUTES_PATHS } from "./routes";
import { AppLayout, BlogDetails } from "./components";
import { UserContext } from "./context";
import { UserContextType, UserProps } from "./types";
import { getUser } from "./api";
import {
  Posts,
  Create,
  Edit,
  Users,
  Dashboard,
  Register,
  Login,
} from "./features";

function AppRouter() {
  const idLocalUser = Number(localStorage.getItem("userId"));
  const { user, setUserState } = useContext(UserContext) as UserContextType;

  useQuery<UserProps>([idLocalUser], () => getUser(idLocalUser), {
    enabled: !!idLocalUser,

    onSuccess: (data) => {
      setUserState(data);
    },
  });

  return (
    <AppLayout>
      <Routes>
        <Route
          path={`${ROUTES_PATHS.login}`}
          element={user ? <Navigate to={`${ROUTES_PATHS.users}`} /> : <Login />}
        />
        <Route
          path={`${ROUTES_PATHS.register}`}
          element={
            user ? <Navigate to={`${ROUTES_PATHS.users}`} /> : <Register />
          }
        />

        <Route
          path={`${ROUTES_PATHS.users}`}
          element={user ? <Users /> : <Navigate to={`${ROUTES_PATHS.login}`} />}
        />

        <Route
          path={`${ROUTES_PATHS.posts}`}
          element={user ? <Posts /> : <Navigate to={`${ROUTES_PATHS.login}`} />}
        />

        <Route
          path={`${ROUTES_PATHS.postCreate}`}
          element={
            user ? <Create /> : <Navigate to={`${ROUTES_PATHS.login}`} />
          }
        />

        <Route
          path={`${ROUTES_PATHS.postIdEdit}`}
          element={user ? <Edit /> : <Navigate to={`${ROUTES_PATHS.login}`} />}
        />

        <Route
          path={`${ROUTES_PATHS.dashboard}`}
          element={
            user ? <Dashboard /> : <Navigate to={`${ROUTES_PATHS.login}`} />
          }
        />

        <Route
          path={`${ROUTES_PATHS.postDetails}`}
          element={
            user ? <BlogDetails /> : <Navigate to={`${ROUTES_PATHS.login}`} />
          }
        />
      </Routes>
    </AppLayout>
  );
}

export default AppRouter;
