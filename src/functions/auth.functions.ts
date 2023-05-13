import { APP_ROUTES } from "@/constants/app-routes";

export const checkIfIsPublicRoute = (path: string) => {
  const routes = Object.values(APP_ROUTES.public);
  return routes.includes(path);
};

export const checkIfUserIsLoggedIn = () => {
  //TODO: descobrir como ver se o usuario ta logado
  const isLogged = true;
  return isLogged;
};
