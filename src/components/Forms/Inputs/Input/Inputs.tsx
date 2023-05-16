import { InputProps } from "@/types";

export const Input: React.FC<InputProps> = ({ errorMsj, label, ...props }) => {
  return (
    <div className="input-label-container">
      {label && (
        <label className="input-label-container__label" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input className="input-label-container__input" {...props} />
      {errorMsj && <p className="error">{errorMsj}</p>}
    </div>
  );
};
