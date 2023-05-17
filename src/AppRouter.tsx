import { RouterProvider } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context";
import { UserProps } from "@/types";
import { getUser } from "@/api";
import { router } from "@/routes";

import "./styles/index.scss";

function AppRouter() {
  const { setUserState } = useAuth();
  const idLocalUser = Number(localStorage.getItem("userId"));

  useQuery<UserProps>([idLocalUser], () => getUser(idLocalUser), {
    enabled: !!idLocalUser,

    onSuccess: (data) => {
      setUserState(data);
    },
  });

  return <RouterProvider router={router} />;
}

export default AppRouter;
