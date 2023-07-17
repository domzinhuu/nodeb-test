"use client";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { AuthContext } from "@/app/context/AuthContext";

function Header() {
  const [userName, setUserName] = useState("");
  const { user } = useContext(AuthContext);
  const pathName = usePathname();

  useEffect(() => {
    setUserName(user?.reprName);
  }, [user]);

  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <div className="">
        <span className="text-3xl capitalize text-gray-500">
          {pathName.replace(/\W/g, "")}
        </span>
      </div>

      <div className="flex items-center gap-4 mr-4">
        <h6 className="lg:h-6 text-sm">
          Bem vindo, <b className="text-primary-500">{userName || "..."}</b>
        </h6>
      </div>
    </div>
  );
}

export default Header;
