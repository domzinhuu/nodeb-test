"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { UseFormRegister } from "react-hook-form";
interface InputTextProps {
  id?: string;
  name: string;
  label?: string;
  secure?: boolean;
  className?: string;
  inputClass?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  value?: any;
  useForm?: boolean;
  onChange?: (el: any) => void;
  register?: UseFormRegister<any>;
}

const InputText = (props: InputTextProps) => {
  const [hasFocus, setHasFocus] = useState(false);
  return (
    <div className={props.className}>
      <div className="text-left w-full h-[30px] bg-white relative">
        <label
          className={`transition-all duration-100  text-gray-400 text-lg absolute ${
            (hasFocus || props.value) &&
            "translate-y-[-25px] text-purple-800 text-sm"
          }`}
        >
          {props.name}
        </label>
        {props.showIcon && props.icon}
        {props.useForm && props.register ? (
          <input
            id={props.id}
            type={props.secure ? "password" : "text"}
            {...props.register(props.name)}
            className={`p-1 absolute w-full border-b border-b-gray-400 outline-none bg-transparent ${props.inputClass}`}
          />
        ) : (
          <input
            id={props.id}
            type={props.secure ? "password" : "text"}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onFocus={(e) => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
            className={`p-1 absolute w-full border-b border-b-gray-400 outline-none bg-transparent ${props.inputClass}`}
          />
        )}
      </div>
    </div>
  );
};

export default InputText;
