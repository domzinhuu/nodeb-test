"use client";

import { Dispatch, ReactNode, SetStateAction, useState } from "react";

interface InputTextProps {
  id?: string;
  name?: string;
  label?: string;
  secure?: boolean;
  className?: string;
  inputClass?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  value: any;
  onChange: (el: any) => void;
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
      </div>
    </div>
  );
};

export default InputText;
