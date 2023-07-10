"use client";

import { SESSION_TOKEN, USER_SESSION } from "@/constants/variables";
import { AuthService } from "@/services/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface UserData {
  clientId: number;
  clientPhone: string;
  cnpj: string;
  ecAddress: string;
  ecPhone: string;
  email: string;
  reprDoc: string;
  reprName: string;
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
  const [token, setToken] = useState("");
  const router = useRouter();

  async function login(
    username: string,
    password: string
  ): Promise<UserData | null> {
    const logged = await AuthService.login(username, password);

    if (logged.token) {
      setIsLogged(true);
      saveSession(logged);
      setUserLogged(logged.user);
      setToken(logged.token);
      return logged;
    }
    return null;
  }

  function saveSession(userLogged: { user: UserData; token: string }): void {
    window.sessionStorage.setItem(USER_SESSION, JSON.stringify(userLogged.user));
    window.sessionStorage.setItem(SESSION_TOKEN, userLogged.token);
  }

  useEffect(() => {
    const user = window.sessionStorage.getItem(USER_SESSION);
    if (!user) {
      router.replace("/");
      return;
    }

    const sessionToken = window.sessionStorage.getItem(SESSION_TOKEN);

    if (sessionToken) {
      setToken(sessionToken);
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
