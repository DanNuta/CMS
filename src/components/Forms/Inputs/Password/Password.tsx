import React, { useState } from "react";

import { InputProps } from "types/input";

import { Input, ShowHidePassword } from "../";

type PasswordProps = Omit<InputProps, "type">;

export const Password: React.FC<PasswordProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  function showPasswordFn() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="container_password">
      <Input {...props} type={showPassword ? "text" : "password"} />
      <ShowHidePassword onShowHideFn={showPasswordFn} state={showPassword} />
    </div>
  );
};
