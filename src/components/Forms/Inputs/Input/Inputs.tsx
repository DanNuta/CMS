import React from "react";

import { InputProps } from "types";

export const Input: React.FC<InputProps> = ({ errorMsj, label, ...props }) => {
  return (
    <div className="container_input">
      {label && (
        <label className="label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className="input" {...props} />
      {errorMsj && <p className="error">{errorMsj}</p>}
    </div>
  );
};
