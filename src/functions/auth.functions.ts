import { APP_ROUTES } from "@/constants/app-routes";
import { USER_SESSION } from "@/constants/variables";
import { userTable } from "@/data/authentications";

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  roles: string[];
}

export const checkIfIsPublicRoute = (path: string) => {
  const routes = Object.values(APP_ROUTES.public);
  return routes.includes(path);
};

export const checkUserIsAuthenticated = ():boolean => {
  //TODO: descobrir como ver se o usuario ta logado
  const loggedUser = window.sessionStorage.getItem(USER_SESSION);

  return !!loggedUser;
};

export const checkifUserExist = (
  username: string,
  password: string
): User | null => {
  const finded = userTable.find(
    (item: User) => item.email === username && item.password === password
  );

  if (!finded) {
    return null;
  }

  return finded;
};

export const checkIfUserHasAdminRole = (userId: string): boolean => {
  const user = userTable.find((user: User) => user.id === userId);

  if (!user) {
    return false;
  }

  return user.roles.includes("ADMIN");
};
