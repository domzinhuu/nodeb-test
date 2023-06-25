"use client";

import { USER_SESSION } from "@/constants/variables";
import { AuthService } from "@/services/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface UserData {
  id: string;
  fullName: string;
  email: string;
  password: string;
  roles: string[];
}

interface AuthContextData {
  user: UserData;
  isLogged: boolean;
  login: (username: string, password: string) => Promise<UserData | null>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState({} as UserData);
  const router = useRouter();

  async function login(
    username: string,
    password: string
  ): Promise<UserData | null> {
    const logged = await AuthService.login(username, password);

    if (logged) {
      setIsLogged(true);
      saveSession(logged);
      setUserLogged(logged);
      return logged;
    }
    return null;
  }

  function saveSession(userLogged: UserData): void {
    window.sessionStorage.setItem(USER_SESSION, JSON.stringify(userLogged));
  }

  useEffect(() => {
    const user = window.sessionStorage.getItem(USER_SESSION);
    if (!user) {
      router.replace("/");
      return;
    }

    setIsLogged(true);
    setUserLogged(JSON.parse(user));
  }, [router]);

  return (
    <AuthContext.Provider value={{ user: userLogged, isLogged, login }}>
      {children}
    </AuthContext.Provider>
  );
}
