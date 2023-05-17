import React from "react";

interface SelectProps {
  name: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string;
}

export const Select: React.FC<SelectProps> = ({
  name,
  options,
  onChange,
  defaultValue,
}) => {
  return (
    <div className="select-container">
      <select
        className="select-container__select"
        onChange={onChange}
        name={name}
        value={defaultValue}
      >
        {options.map((item, i) => {
          return (
            <option className="select-container__option" key={i} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};
