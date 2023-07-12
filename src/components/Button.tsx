import React, { ReactNode } from "react";
import { AiOutlineLoading } from "react-icons/ai";
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  isLoading: boolean;
}

const Button = ({ children, isLoading = false, ...props }: ButtonProps) => (
  <button
    {...props}
    className={`bg-primary-500 text-white p-3 drop-shadow-lg shadow-black hover:bg-primary-700 transition-all duration-150 rounded-lg ${props.className}`}
  >
    <div className="flex gap-1 items-center justify-center">
      {isLoading && <AiOutlineLoading className="animate-spin text-xl" />}
      <span>{children}</span>
    </div>
  </button>
);

export default Button;
