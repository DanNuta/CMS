import React from "react";

import { InputProps } from "types";

export const Input: React.FC<InputProps> = ({ errorMsj, ...props }) => {
  return (
    <div className="container_input">
      <input className="input" {...props} />
      {errorMsj && <p className="error">{errorMsj}</p>}
    </div>
  );
};
