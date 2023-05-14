import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { ReactNode } from "react";
interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <SideBar>
      <main className="bg-gray-100 min-h-screen">
        <Header />
        {children}
      </main>
    </SideBar>
  );
}
