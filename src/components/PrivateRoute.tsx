"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { USER_SESSION } from "@/constants/variables";
import {
  checkIfUserHasAdminRole,
  checkUserIsAuthenticated,
} from "@/functions/auth.functions";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push, replace } = useRouter();
  const pathName = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = checkUserIsAuthenticated();
    const loggedUser = window.sessionStorage.getItem(USER_SESSION);
    const user = loggedUser && JSON.parse(loggedUser);

    if (
      authenticated &&
      pathName.includes("settings") &&
      !checkIfUserHasAdminRole(user?.id)
    ) {
      push(APP_ROUTES.private.dashboard.name);
    }

    setIsAuthenticated(authenticated);
    if (!authenticated) {
      //TODO: adicionar um notify para informar o pq do redirecionamento
      replace(APP_ROUTES.public.login);
    }
  }, [push, replace, pathName]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
