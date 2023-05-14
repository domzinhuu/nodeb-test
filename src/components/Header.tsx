"use client";

import { UserContext } from "@/app/context/UserContext";
import { APP_ROUTES } from "@/constants/app-routes";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";

function Header() {
  const [userName, setUserName] = useState("");
  const { fullName, setLoggedUser } = useContext<any>(UserContext);
  const pathName = usePathname();
  const { replace } = useRouter();

  useEffect(() => {
    setUserName(fullName);
  }, [fullName]);

  const logout = (): void => {
    clearSession();
    setLoggedUser(null);
    replace(APP_ROUTES.public.login);
  };

  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <div className="">
        <h4 className="text-2xl  uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-green-400">Nodeb</h4>
        <span className="text-xl capitalize text-gray-500">{pathName.replace(/\W/g, "")}</span>
      </div>

      <div className="flex items-center gap-4">
        <h6 className="lg:h-6 text-sm">
          Bem vindo, <b className="text-purple-800">{userName || "..."}</b>
        </h6>
        <div
          onClick={logout}
          className="bg-white rounded-lg p-2 flex justify-center items-center border drop-shadow-md cursor-pointer shadow-purple-800"
        >
          <FiLogOut className="text-purple-800 font-bold" size={16} />
        </div>
      </div>
    </div>
  );
}

function clearSession(): void {
  window.sessionStorage.clear();
}

export default Header;
