import React from "react";

import "./style.scss";

interface SelectProps {
  name: string;
  options: string[];
  errorMsj: string | null;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  errorMsj,
  onChange,
}) => {
  return (
    <div className="container_select">
      <select onChange={onChange} name={name}>
        {options.map((item, i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      {errorMsj && <p> {errorMsj}</p>}
    </div>
  );
};
