import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import { ROUTES_PATHS } from "./routes";
import { Register, Login, Users } from "./features/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: ROUTES_PATHS.login,
    element: <Login />,
  },
  {
    path: ROUTES_PATHS.register,
    element: <Register />,
  },
  {
    path: ROUTES_PATHS.users,
    element: <Users />,
  },
]);

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
);
