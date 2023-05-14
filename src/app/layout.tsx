"use client";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { ReactNode, useEffect, useState } from "react";
import {
  User,
  checkIfIsPublicRoute,
  checkUserIsAuthenticated,
} from "@/functions/auth.functions";
import PrivateRoute from "@/components/PrivateRoute";
import { APP_ROUTES } from "@/constants/app-routes";
import { UserContext } from "./context/UserContext";
import { USER_SESSION } from "@/constants/variables";

export default function RootLayout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const { push } = useRouter();
  const isPublic = checkIfIsPublicRoute(path);
  const alreadyAuthenticated = checkUserIsAuthenticated();
  const [loggedUser, setLoggedUser] = useState<User>();

  useEffect(() => {
    if (alreadyAuthenticated && !loggedUser) {
      const json = window.sessionStorage.getItem(USER_SESSION);
      const user: User = JSON.parse(json!);
      setLoggedUser(user);
    }

    if (isPublic && alreadyAuthenticated) {
      push(APP_ROUTES.private.dashboard.name);
    }
  }, [loggedUser, alreadyAuthenticated, isPublic, push]);

  return (
    <html lang="en">
      <body className="bg-gray-50">
        {isPublic && alreadyAuthenticated && null}
        {isPublic && children}
        {!isPublic && (
          <UserContext.Provider value={{ ...loggedUser, setLoggedUser }}>
            <PrivateRoute>{children}</PrivateRoute>
          </UserContext.Provider>
        )}
      </body>
    </html>
  );
}
