import React, { PropsWithChildren } from "react";
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

  return user ? (
    <Navigate to={`${ROUTES_PATHS.users}`} />
  ) : (
    <React.Suspense fallback={<h1>loading...</h1>}>
      <Outlet />
    </React.Suspense>
  );
};

export const ProtectRouter: React.FC<PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to={`${ROUTES_PATHS.login}`} />;
};

export const RedirectUser = () => {
  const url = window.location.pathname;

  if (url !== `${ROUTES_PATHS.users}`) {
    return <Navigate to={`${ROUTES_PATHS.users}`}></Navigate>;
  }

  const splitURL = url.split("/")[1];

  return <Navigate to={`${splitURL}`} />;
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
        errorElement={<RedirectUser />}
        element={<AuthLayout />}
      >
        <Route errorElement={<RedirectUser />} element={<AppLayout />}>
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
