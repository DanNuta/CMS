import { UserProps } from "./user";

export interface UserContextType {
  user: UserProps | null;
  updateUser: (user:UserProps) => void
  logOut: () => void;
}
