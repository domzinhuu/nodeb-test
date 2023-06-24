import React, { ReactNode } from "react";
import { AiOutlineLoading } from "react-icons/ai";
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  isLoading?: boolean;
}

const Button = (props: ButtonProps) => (
  <button
    {...props}
    className={`bg-purple-800 text-white mt-8 p-3 drop-shadow-lg shadow-black hover:bg-purple-700 transition-all duration-150 rounded-lg ${props.className}`}
  >
    <div className="flex gap-1 items-center justify-center">
      {props.isLoading && <AiOutlineLoading className="animate-spin text-xl" />}
      <span>{props.children}</span>
    </div>
  </button>
);

export default Button;
