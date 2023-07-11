"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { isValid } from "zod";
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
  const [hasValue, setHasValue] = useState(false);

  function handleToggleFocus(focus: boolean, value: string) {
    setHasFocus(focus);
    if (value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  }
  return (
    <div className={props.className}>
      <div className="text-left w-full h-[30px] bg-white relative">
        <label
          className={`transition-all duration-100  text-gray-400 text-lg absolute ${
            (hasFocus || hasValue) &&
            "translate-y-[-25px] text-primary-500 text-sm"
          }`}
        >
          {props.name}
        </label>
        {props.showIcon && props.icon}
        {props.useForm && props.register ? (
          <input
            id={props.id}
            type={props.secure ? "password" : "text"}
            required
            {...props.register(props.name)}
            onBlur={(e) => handleToggleFocus(false, e.target.value)}
            onFocus={(e) => handleToggleFocus(true, e.target.value)}
            className={`p-1 absolute w-full border-b border-b-gray-400 outline-none bg-transparent ${props.inputClass}`}
          />
        ) : (
          <input
            id={props.id}
            type={props.secure ? "password" : "text"}
            name={props.name}
            required
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
