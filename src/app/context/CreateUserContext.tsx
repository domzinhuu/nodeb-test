import { ReactNode, createContext, useState } from "react";

interface LoginData {
  email_login: string;
  password: string;
}

interface EcData {
  address: string;
  phone: string;
  doc: string;
  revenue?: string;
  combo: ComboAcquirer;
  representative: Representative;
}

interface Representative {
  name: string;
  doc: string;
  phone: string;
  email: string;
}

interface ComboAcquirer {
  added: Map<String, Array<String>>;
}

interface CreateUserData {
  user: LoginData;
  ec: EcData;
}

interface CreateUserContextProps {
  createUser: CreateUserData;
  onChangeUserInfo: (email?: string, password?: string) => void;
}

export const CreateUserContext = createContext({} as CreateUserContextProps);

interface CreateUserContextProviderProps {
  children: ReactNode;
}
export function CreateUserContextProvider({
  children,
}: CreateUserContextProviderProps) {
  const [createUser, setCreateUser] = useState<CreateUserData>(
    {} as CreateUserData
  );

  function handleLoginDataChange(email: string = "", password: string = "") {
    let user: LoginData = { email_login: email, password };
    setCreateUser((prev) => {
      return {
        ...prev,
        user,
      };
    });
  }

  return (
    <CreateUserContext.Provider
      value={{ createUser, onChangeUserInfo: handleLoginDataChange }}
    ></CreateUserContext.Provider>
  );
}
