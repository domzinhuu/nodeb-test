"use client";

import { UserContext } from "@/app/context/UserContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

function Header() {
  const [userName, setUserName] = useState("");
  const { fullName } = useContext<any>(UserContext);
  const pathName = usePathname();

  useEffect(() => {
    setUserName(fullName);
  }, [fullName]);

  

  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <div className="">
        <h4 className="text-2xl  uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-green-400">Nodeb</h4>
        <span className="text-xl capitalize text-gray-500">{pathName.replace(/\W/g, "")}</span>
      </div>

      <div className="flex items-center gap-4 mr-4">
        <h6 className="lg:h-6 text-sm">
          Bem vindo, <b className="text-purple-800">{userName || "..."}</b>
        </h6>
      </div>
    </div>
  );
}


export default Header;
