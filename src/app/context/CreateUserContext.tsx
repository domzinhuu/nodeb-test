import { uniq } from "lodash";
import { ReactNode, createContext, useState } from "react";
import { CreateUserForm } from "../createUser/page";
import { api } from "@/lib/axios";
import { toFormData } from "axios";

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

export interface AddEcAndAcquirerForm {
  ecName: string;
  acqName: string;
  ecDoc: string;
  acqDoc: string;
}

interface CreateUserContextProps {
  createUser: CreateUserData;
  docUrl: string;
  onSave: (data: CreateUserForm) => void;
  onUploadFile: (file: any) => void;
  onAddNewEcAndAcquirer: (formData: AddEcAndAcquirerForm) => void;
  onRemoveEc: (ecDoc: string) => void;
  onRemoveAcquirerFromEc: (formData: AddEcAndAcquirerForm) => void;
}

export const CreateUserContext = createContext({} as CreateUserContextProps);

interface CreateUserContextProviderProps {
  children: ReactNode;
}
export function CreateUserContextProvider({
  children,
}: CreateUserContextProviderProps) {
  const [docFiles, setDocFiles] = useState<any>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [createUser, setCreateUser] = useState<CreateUserData>({
    ec: { combo: { added: undefined } },
  } as CreateUserData);

  function handleUploadFile(event: any) {
    if (event.target.files && event.target.files.length) {
      const i = event.target.files[0];
      setImgUrl(URL.createObjectURL(i));
      setDocFiles(i);
    }
  }

  async function handleSave(data: CreateUserForm) {
    const userEntity = buildUser(data);
    userEntity.ec.combo = createUser.ec.combo;

    await api.postForm("/upload", {
      name: userEntity.user?.email_login,
      documents: docFiles,
    });

    await api.post("/register", { ...userEntity });
  }

  function handleAddEcAndAcquirer(formData: AddEcAndAcquirerForm) {
    setCreateUser((prev) => {
      let newValue = { ...prev };
      let combo: ComboAcquirer = { ...newValue.ec.combo };

      if (!combo.added) {
        combo.added = {};
      }

      const valuesWithouFormats = {
        ...formData,
        ecDoc: formData.ecDoc.replace(/\D/g, ""),
        acqDoc: formData.acqDoc.replace(/\D/g, ""),
      };

      if (Object.keys(combo.added).includes(valuesWithouFormats.ecDoc)) {
        const addedAcquirers: any[] =
          combo.added[valuesWithouFormats.ecDoc.replace(/\D/g, "")];

        addedAcquirers.push(valuesWithouFormats);
        combo.added[formData.ecDoc] = uniq(addedAcquirers);
      } else {
        combo.added[valuesWithouFormats.ecDoc] = [valuesWithouFormats];
        newValue.ec.combo = combo;
      }

      return newValue;
    });
  }

  function handleRemoveEc(ecDoc: string) {
    setCreateUser((prev) => {
      const newValue = { ...prev };
      const combo = { ...newValue.ec.combo };

      delete combo.added[ecDoc.replace(/\D/g, "")];

      newValue.ec.combo = combo;
      return newValue;
    });
  }

  function handleRemoveAcquirerFromEc(formData: AddEcAndAcquirerForm) {
    const valuesWithouFormats = {
      ...formData,
      ecDoc: formData.ecDoc.replace(/\D/g, ""),
      acqDoc: formData.acqDoc.replace(/\D/g, ""),
    };

    setCreateUser((prev) => {
      const newValue = { ...prev };
      const combo = { ...newValue.ec.combo };

      combo.added[valuesWithouFormats.ecDoc] = combo.added[
        valuesWithouFormats.ecDoc
      ].filter(
        (data: AddEcAndAcquirerForm) =>
          data.acqDoc !== valuesWithouFormats.acqDoc
      );

      newValue.ec.combo = combo;
      return newValue;
    });
  }

  return (
    <CreateUserContext.Provider
      value={{
        createUser,
        docUrl: imgUrl,
        onSave: handleSave,
        onUploadFile: handleUploadFile,
        onAddNewEcAndAcquirer: handleAddEcAndAcquirer,
        onRemoveEc: handleRemoveEc,
        onRemoveAcquirerFromEc: handleRemoveAcquirerFromEc,
      }}
    >
      {children}
    </CreateUserContext.Provider>
  );
}

const buildUser = (data: CreateUserForm): CreateUserData => {
  const createUser: CreateUserData = {
    user: {
      email_login: data.emailLogin,
      password: data.password,
    },
    ec: {
      address: `${data.street} ${data.number}, ${data.info} ${data.neighborhood}/${data.city} - ${data.uf}`,
      phone: data.companyPhone.replace(/\D/g, ""),
      doc: data.companyDocument.replace(/\D/g, ""),
      revenue: data.revenue,
      representative: {
        doc: data.repDoc.replace(/\D/g, ""),
        email: data.repEmail,
        name: data.repName,
        phone: data.repPhone.replace(/\D/g, ""),
      },
      combo: {},
    },
  };

  return createUser;
};
