import { ChangeEvent } from "react";

interface TextAreaProps {
  label: string;
  id: string;
  errorMsj: string | null;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export const Textarea: React.FC<TextAreaProps> = ({
  label,
  errorMsj,
  value,
  onChange,
  id,
}) => {
  return (
    <div className="textarea-label-container">
      {label && (
        <label className="textarea-label-container__label" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        rows={4}
        className="textarea-label-container__textarea"
        value={value}
        onChange={onChange}
      ></textarea>
      {errorMsj && <p className="error">{errorMsj}</p>}
    </div>
  );
};
