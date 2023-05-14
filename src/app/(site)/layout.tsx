import SideBar from "@/components/SideBar";
import { ReactNode } from "react";
interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  return <SideBar>{children}</SideBar>;
}
