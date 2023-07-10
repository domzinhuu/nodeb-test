import { UserData } from "@/app/context/AuthContext";
import { api } from "@/lib/axios";

async function login(userName: string, password: string): Promise<any | null> {
  const response = await api.post(`/login`, { email: userName, password });
  if (!response.headers.authorization) {
    return null;
  }

  const user: UserData = response.data.currentClient;

  return { user, token: response.headers.authorization };
}

export const AuthService = {
  login,
};
