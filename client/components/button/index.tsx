import { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  onClick?: () => void;
};

const Button: React.FC<Props> = (props) => (
  <button {...props} className="btn cursor-pointer">
    {props.children}
  </button>
);

export default Button;
