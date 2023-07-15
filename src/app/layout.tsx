"use client";
import { usePathname } from "next/navigation";
import "./globals.css";
import { ReactNode } from "react";
import { checkIfIsPublicRoute } from "@/functions/auth.functions";
import PrivateRoute from "@/components/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";
import { CreateUserContextProvider } from "./context/CreateUserContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const isPublic = checkIfIsPublicRoute(path);

  return (
    <html lang="en">
      <body className="bg-gray-50">
        <CreateUserContextProvider>
          <AuthContextProvider>{isPublic && children}</AuthContextProvider>

          {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
          <ToastContainer />
        </CreateUserContextProvider>
      </body>
    </html>
  );
}
