import React, {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
} from "react";

import { UserProps, UserContextType } from "@/types";

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUserState] = useState<UserProps | null>(null);

  function logOut() {
    localStorage.clear();
    setUserState(null);
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
