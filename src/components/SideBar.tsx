"use client";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/UserContext";
import { checkIfUserHasAdminRole } from "@/functions/auth.functions";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";

function SideBar({ children }: any) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const { id } = useContext<any>(UserContext);
  const { setLoggedUser } = useContext<any>(UserContext);

  const { replace } = useRouter();

  const logout = (): void => {
    clearSession();
    setLoggedUser(null);
    replace(APP_ROUTES.public.login);
  };

  useEffect(() => {
    const userAdmin = checkIfUserHasAdminRole(id);
    setIsAdmin(userAdmin);
  }, [id]);
  return (
    <div className="flex lg:flex-row flex-col-reverse ">
      <MenuMobile logout={logout} isAdmin={isAdmin} />
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] lg:flex hidden flex-col justify-between">
        <div className="flex flex-col items-center">
          <Link href="/dashboard">
            <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
              <RxDashboard size={20} />
            </div>
          </Link>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
        </div>

        <div className="flex flex-col items-center justify-between">
          {isAdmin && (
            <Link href="/settings">
              <div className="bg-green-600 text-white p-3 rounded-lg inline-block">
                <FiSettings size={20} />
              </div>
            </Link>
          )}
          <span className="my-4 border-b-[1px] border-gray-200 w-full p-2"></span>
          <div onClick={logout}>
            <div className="bg-gray-200 text-purple-800 p-3 rounded-lg inline-block">
              <FiLogOut size={20} />
            </div>
          </div>
        </div>
      </div>
      <main className="lg:ml-20 w-full  lg:pb-0 pb-16">{children}</main>
    </div>
  );
}

interface MenuMobileProps {
  logout: () => void;
  isAdmin: boolean;
}

function MenuMobile({ logout, isAdmin }: MenuMobileProps) {
  return (
    <div className="shadow-slate-800 shadow-lg fixed z-10 bottom-0 w-screen h-16 p-4 bg-white border-r-[1px] lg:hidden flex justify-between">
      <div className="w-screen flex items-center justify-center gap-4">
        <Link href="/dashboard">
          <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
            <RxDashboard size={20} />
          </div>
        </Link>

        {isAdmin && (
          <Link href="/settings">
            <div className="bg-gray-800 text-white p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
          </Link>
        )}

        <div className="flex flex-col items-center justify-between">
          <span className="my-4 border-b-[1px] border-gray-200 w-full p-2"></span>
          <div onClick={logout}>
            <div className="bg-gray-200 text-purple-800 p-3 rounded-lg inline-block">
              <FiLogOut size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function clearSession(): void {
  window.sessionStorage.clear();
}
export default SideBar;
