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
    <div className="text-area">
      {label && (
        <label className="label" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea value={value} onChange={onChange}></textarea>
      {errorMsj && <p className="error">{errorMsj}</p>}
    </div>
  );
};
