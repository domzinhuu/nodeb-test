"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserIsAuthenticated } from "@/functions/auth.functions";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = checkUserIsAuthenticated();
    setIsAuthenticated(authenticated);
    if (!authenticated) {
      //TODO: adicionar um notify para informar o pq do redirecionamento
      push(APP_ROUTES.public.login);
    }
  }, [push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
