import React from "react";

interface SelectProps {
  name: string;
  options: string[];
  errorMsj?: string | null;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({ name, options, onChange }) => {
  return (
    <div className="select-container">
      <select
        className="select-container__select"
        onChange={onChange}
        name={name}
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
