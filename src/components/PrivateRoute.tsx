"use client";

import { APP_ROUTES } from "@/constants/app-routes";
import { checkUserIsAuthenticated } from "@/functions/auth.functions";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter();
  const isAuthenticated = checkUserIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      //TODO: adicionar um notify para informar o pq do redirecionamento
      push(APP_ROUTES.public.login);
    }
  }, [isAuthenticated, push]);

  return (
    <>
      {!isAuthenticated && null}
      {isAuthenticated && children}
    </>
  );
};

export default PrivateRoute;
