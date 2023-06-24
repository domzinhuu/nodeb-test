import { UserData } from "@/app/context/AuthContext";
import { api } from "@/lib/axios";

async function login(
  userName: string,
  password: string
): Promise<UserData | null> {
  const response = await api.get(`/user/${userName}`);

  if (!response.data) {
    return null;
  }

  const user: UserData = response.data[0];

  if (user.password !== password) {
    return null;
  }

  return user;
}

export const AuthService = {
  login,
};
