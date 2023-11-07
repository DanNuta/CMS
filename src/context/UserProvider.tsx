import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import { UserProps, UserContextType } from "@/types";
import { ROUTES_PATHS } from "@/routes";

interface UserContextProps {
  userData: any
}

export const UserContext = createContext<any>(null);

export const UserContextProvider: React.FC<
  PropsWithChildren<UserContextProps>
> = ({ children, userData }) => {
  const [user, setUserState] = useState<UserProps | string | null>(userData);

  const location = useNavigate();
  function logOut() {
    localStorage.clear();
    setUserState(null);
    location(`${ROUTES_PATHS.login}`);
  }

  return (
    <UserContext.Provider value={{ user, setUserState, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error("The context is not defined");
  }
  const { logOut, setUserState, user } = authContext as UserContextType;
  return { logOut, setUserState, user };
};
