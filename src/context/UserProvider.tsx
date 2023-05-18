import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";

import { UserProps, UserContextType } from "@/types";
import { useNavigate } from "react-router-dom";
import { ROUTES_PATHS } from "@/routes";

interface UserConterxtProps {
  userData: UserProps;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<
  PropsWithChildren<UserConterxtProps>
> = ({ children, userData }) => {
  const [user, setUserState] = useState<UserProps | null>(userData);

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
