import React from "react";

import { inputStyle, utilityStyle } from "../../../../styles";

import "./style.scss";

interface SelectProps {
  name: string;
  options: string[];
  errorMsj: string | null;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <div className="container_select">
      <select onChange={props.onChange} name={props.name}>
        {props.options.map((item, i) => {
          return (
            <option key={i} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      {props.errorMsj && (
        <p
          className={`
         ${utilityStyle.clr_red} 
         ${utilityStyle.font_size_16} 
         ${utilityStyle.mt_10} 
         ${inputStyle.error_msj}`}
        >
          {props.errorMsj}
        </p>
      )}
    </div>
  );
};
