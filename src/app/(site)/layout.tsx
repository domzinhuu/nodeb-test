"use client";

import SideBar from "@/components/SideBar";
import { checkIfIsPublicRoute } from "@/functions/auth.functions";
import { usePathname } from "next/navigation";
interface SiteLayoutProps {
  children: React.ReactNode;
}

export default function SiteLayout({
  children,
}: SiteLayoutProps) {
  const path = usePathname();
  const isPublic = checkIfIsPublicRoute(path);
  return <SideBar>{children}</SideBar>;
}
