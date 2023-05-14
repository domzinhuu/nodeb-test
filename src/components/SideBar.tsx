'use client'
import Link from "next/link";
import { RxDashboard, RxSketchLogo } from "react-icons/rx";
import { FiSettings } from "react-icons/fi";

function SideBar({ children }: any) {
  return (
    <div className="flex lg:flex-row flex-col-reverse ">
      <MenuMobile />
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
          <span className="my-4 border-b-[1px] border-gray-200 w-full p-2"></span>
          <Link href="/settings">
          <div className="bg-gray-800 text-white p-3 rounded-lg inline-block">
              <FiSettings size={20} />
            </div>
          </Link>
        </div>
      </div>
      <main className="lg:ml-20 w-full  lg:pb-0 pb-16">{children}</main>
    </div>
  );
}

function MenuMobile() {
  return (
    <div className="shadow-slate-800 shadow-lg fixed z-10 bottom-0 w-screen h-16 p-4 bg-white border-r-[1px] lg:hidden flex justify-between">
      <div className="w-screen flex items-center justify-center gap-4">
        <Link href="/dashboard">
          <div className="bg-purple-800 text-white p-3 rounded-lg inline-block">
            <RxDashboard size={20} />
          </div>
        </Link>

        <Link href="/settings">
          <div className="bg-gray-800 text-white p-3 rounded-lg inline-block">
            <FiSettings size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
