import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";

import { UserProps, UserContextType } from "@/types";
import { ROUTES_PATHS } from "@/routes";


export const UserContext = createContext<UserContextType>({
  logOut: () => {
    // 
  },
  user: null,
  updateUser: () => {
    // 
  }
  
});

export const UserContextProvider: React.FC<
  PropsWithChildren
> = ({ children }) => {
  const [user, setUserState] = useState<UserProps | null>(null);

  const location = useNavigate();
  function logOut() {
    localStorage.clear();
    setUserState(null);
    location(`${ROUTES_PATHS.login}`);
  }

  function updateUser(user: UserProps)  {
    setUserState(user);
  }

  return (
    <UserContext.Provider value={{ user, updateUser, logOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = (): UserContextType => {
  const authContext = useContext(UserContext);

  if (!authContext) {
    throw new Error("The context is not defined");
  }
  return authContext
};
