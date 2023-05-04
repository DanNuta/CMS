import { UserProps } from "./user";

export interface LogInUser {
  user?: UserProps;
  changeUser: (user?: UserProps) => void;
}
