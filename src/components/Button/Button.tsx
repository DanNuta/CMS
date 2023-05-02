
interface ButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, title, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {title}
    </button>
  );
};
