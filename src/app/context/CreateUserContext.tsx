import { uniq } from "lodash";
import { ReactNode, createContext, useState } from "react";

interface LoginData {
  email_login: string;
  password: string;
}

interface EcData {
  address?: string;
  phone?: string;
  doc?: string;
  revenue?: string;
  combo: ComboAcquirer;
  representative?: Representative;
}

interface Representative {
  name: string;
  doc: string;
  phone: string;
  email: string;
}

interface ComboAcquirer {
  added?: any;
}

interface CreateUserData {
  user?: LoginData;
  ec: EcData;
}

interface CreateUserContextProps {
  createUser: CreateUserData;
  onChangeUserInfo: (email?: string, password?: string) => void;
  onAddNewEcAndAcquirer: (ecDoc: string, acqDoc: string) => void;
  onRemoveEc: (ecDoc: string) => void;
  onRemoveAcquirerFromEc: (ecDoc: string, acqDoc: string) => void;
}

export const CreateUserContext = createContext({} as CreateUserContextProps);

interface CreateUserContextProviderProps {
  children: ReactNode;
}
export function CreateUserContextProvider({
  children,
}: CreateUserContextProviderProps) {
  const [createUser, setCreateUser] = useState<CreateUserData>({
    ec: { combo: { added: undefined } },
  } as CreateUserData);

  function handleLoginDataChange(email: string = "", password: string = "") {
    let user: LoginData = { email_login: email, password };
    setCreateUser((prev) => {
      return {
        ...prev,
        user,
      };
    });
  }

  function handleAddEcAndAcquirer(ecDoc: string, acqDoc: string) {
    setCreateUser((prev) => {
      let newValue = { ...prev };
      let combo: ComboAcquirer = { ...newValue.ec.combo };

      if (!combo.added) {
        combo.added = {};
      }

      if (Object.keys(combo.added).includes(ecDoc)) {
        //TODO: posso retornar um erro aqui ou adicionar +1 adquirente
        const addedAcquirers: string[] = combo.added[ecDoc];
        addedAcquirers.push(acqDoc);
        combo.added[ecDoc] = uniq(addedAcquirers);
      } else {
        combo.added[ecDoc] = [acqDoc];
        newValue.ec.combo = combo;
      }

      return newValue;
    });
  }

  function handleRemoveEc(ecDoc: string) {
    setCreateUser((prev) => {
      const newValue = { ...prev };
      const combo = { ...newValue.ec.combo };

      delete combo.added[ecDoc];

      newValue.ec.combo = combo;
      return newValue;
    });
  }

  function handleRemoveAcquirerFromEc(ecDoc: string, acqDoc: string) {
    setCreateUser((prev) => {
      const newValue = { ...prev };
      const combo = { ...newValue.ec.combo };

      combo.added[ecDoc] = combo.added[ecDoc].filter(
        (acq: string) => acq !== acqDoc
      );

      newValue.ec.combo = combo;
      return newValue;
    });
  }

  return (
    <CreateUserContext.Provider
      value={{
        createUser,
        onChangeUserInfo: handleLoginDataChange,
        onAddNewEcAndAcquirer: handleAddEcAndAcquirer,
        onRemoveEc: handleRemoveEc,
        onRemoveAcquirerFromEc: handleRemoveAcquirerFromEc,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
}
