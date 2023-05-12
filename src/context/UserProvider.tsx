import React, { createContext, useState, PropsWithChildren } from "react";

import { UserProps, UserContextType } from "@/types";

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUserState] = useState<UserProps | null>(null);

  return (
    <UserContext.Provider value={{ user, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};
