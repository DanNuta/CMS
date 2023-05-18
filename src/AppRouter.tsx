import { PropsWithChildren } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Navigate,
  Outlet,
} from "react-router-dom";

import { useAuth } from "@/context";
import { getUser } from "@/api";
import { authRoutes, appRouters, ROUTES_PATHS } from "./routes";
import { AppLayout, AuthLayout } from "@/components";

import "./styles/index.scss";

export const ProtectedRouterLogin: React.FC<PropsWithChildren> = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={`${ROUTES_PATHS.users}`} />;
  }

  return <Outlet />;
};

export const ProtectRouter: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    <Navigate to={`${ROUTES_PATHS.login}`}></Navigate>;
  }

  return <>{children}</>;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        loader={() =>
          defer({
            userPromise: localStorage.getItem("userId") && getUser(),
          })
        }
        element={<AuthLayout />}
      >
        <Route element={<AppLayout />}>
          {appRouters.map((router, i) => {
            return <Route key={i} {...router} />;
          })}
        </Route>

        <Route element={<ProtectedRouterLogin />}>
          {authRoutes.map((route, i) => {
            return <Route key={i} {...route} />;
          })}
        </Route>
      </Route>
    </>
  )
);
