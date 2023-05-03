import React, { createContext, useState, PropsWithChildren } from "react";

import { UserProps, LogInUser } from "types";

export const LogIn = createContext<LogInUser | null>(null);

export const LogInProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUserState] = useState<UserProps | null>(null);

  function changeUser(user: UserProps) {
    setUserState(user);
  }

  return (
    <LogIn.Provider value={{ user, changeUser }}>{children}</LogIn.Provider>
  );
};
