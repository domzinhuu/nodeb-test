import { ReactNode } from "react";
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
}

const Button = (props: ButtonProps) => (
  <button
    {...props}
    className={`bg-purple-800 text-white mt-8 p-3 drop-shadow-lg shadow-black hover:bg-purple-700 transition-all duration-150 rounded-lg ${props.className}`}
  >
    {props.children}
  </button>
);

export default Button;
