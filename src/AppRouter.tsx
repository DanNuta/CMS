import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { UserContext } from "@/context";
import { UserProps, UserContextType } from "@/types";
import { getUser } from "@/api";
import { router } from "@/routes";

import "./styles/index.scss";

function AppRouter() {
  const { setUserState } = useContext(UserContext) as UserContextType;
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
