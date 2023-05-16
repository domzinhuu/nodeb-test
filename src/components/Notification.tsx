"use client";
import { useContext, useEffect, useState } from "react";

const NOTIFICATION_HIDE_STYLE = "translate-x-[500px] opacity-0";
const NOTIFICATION_SHOW_STYLE = "translate-x-0 opacity-1";
const NOTIFICATION_INFO_STYLE =
  "bg-gradient-to-r from-blue-500 to-blue-300 text-white";
const NOTIFICATION_SUCCESS_STYLE =
  "bg-gradient-to-r from-green-800 to-green-600 text-white";
const NOTIFICATION_WARNING_STYLE =
  "bg-gradient-to-r from-orange-500 to-orange-300 text-white";
const NOTIFICATION_DANGER_STYLE =
  "bg-gradient-to-r from-red-800 to-red-600 text-white";
const DEFAULT_NOTIFICATION_STYLE =
  "flex flex-col drop-shadow-lg justify-center lg:w-[400px] w-[100px] h-[100px] absolute p-4 rounded-lg right-0 m-2";

function Notification() {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`transition-all duration-500 origin-top-right ${NOTIFICATION_HIDE_STYLE} ${DEFAULT_NOTIFICATION_STYLE} ${NOTIFICATION_INFO_STYLE}`}
    >
      <h2 className="text-xl font-bold">Titulo</h2>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
    </div>
  );
}

export default Notification;
