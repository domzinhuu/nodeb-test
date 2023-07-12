import { UserData } from "@/app/context/AuthContext";
import { api } from "@/lib/axios";

async function login(userName: string, password: string): Promise<any | null> {
  const response = await api.post(`/login`, { email: userName, password });
  if (!response.data.accessToken) {
    return null;
  }

  const user: UserData = response.data.currentClient;

  return { user, token: response.data.accessToken, refreshToken: response.data.refreshToken };
}

export const AuthService = {
  login,
};
