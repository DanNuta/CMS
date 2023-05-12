import { UserProps } from "./user";

export interface UserContextType {
  user: UserProps | null;
  setUserState: React.Dispatch<React.SetStateAction<UserProps | null>>;
}
