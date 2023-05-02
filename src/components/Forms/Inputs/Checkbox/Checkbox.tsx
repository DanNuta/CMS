import React from "react";

import { InputProps } from "types/input";

import "./style.scss";

interface CheckboxProps extends InputProps {
  label: string;
}

type CheckboxPropsType = Omit<CheckboxProps, "value">;

export const Checkbox: React.FC<CheckboxPropsType> = ({
  errorMsj,
  label,
  ...props
}) => {
  return (
    <div className="container_checkbox">
      <div>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />
      </div>

      {errorMsj && <p className="error">{errorMsj}</p>}
    </div>
  );
};
