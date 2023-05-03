import { UserProps } from "./user";

export interface LogInUser {
  user: UserProps | null;
  changeUser: (user: UserProps) => void;
}
