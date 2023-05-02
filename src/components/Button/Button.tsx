import "./style.scss";

interface ButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {props.title}
    </button>
  );
};
