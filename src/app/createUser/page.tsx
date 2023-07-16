"use client";
import * as z from "zod";
import { useContext, useState } from "react";
import { Typography } from "@mui/material";
import Image from "next/image";
import { ArrowArcLeft, FloppyDiskBack, MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";

import logo from "../../../public/logo.png";
import CompanyDataForm from "@/components/CompanyDataForm";
import { CreateUserContext } from "../context/CreateUserContext";
import {
  maskToCellhone,
  maskToCpf,
  matchEmailPattern,
  matchPhonePattern,
  validateCpf,
} from "@/utils/helper.functions";
import { CompanyData } from "@/services/helpers";
import Link from "next/link";

const createUserSchema = z.object({
  emailLogin: z.string(),
  password: z.string(),
  companyName: z.string(),
  companyDocument: z.string().min(18).max(18),
  zipCode: z.string(),
  street: z.string(),
  number: z.number(),
  neighborhood: z.string(),
  info: z.string(),
  city: z.string(),
  uf: z.string(),
  revenue: z.string(),
  companyPhone: z.string(),
  repEmail: z.string(),
  repName: z.string(),
  repPhone: z.string(),
  repDoc: z.string().min(14).max(14),
});

export type CreateUserForm = z.infer<typeof createUserSchema>;

export default function CreateUserPage() {
  const [showCompanyAdminData, setShowCompanyAdminData] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CreateUserForm>();
  const { onAddNewEcAndAcquirer, createUser, onSave } =
    useContext(CreateUserContext);

  function handleNewEcAndAcquirer(formData: any) {
    onAddNewEcAndAcquirer(formData);
  }

  console.log(errors);

  function handleSave(data: CreateUserForm) {
    onSave(data);
  }

  function handleCompanyDataChange(data: CompanyData | null) {
    const d = getValues();

    if (data) {
      reset({
        city: data.city,
        neighborhood: data.neighborhood,
        info: data.info,
        zipCode: data.cep,
        companyName: data.name,
        companyPhone: data.phone,
        street: data.street,
        uf: data.state,
      });
      setShowCompanyAdminData(true);
    } else {
      console.log("cnpj invalido");
    }
  }
  return (
    <div className="w-full flex justify-center items-center text-slate-700 my-8">
      <form
        noValidate
        onSubmit={handleSubmit(handleSave)}
        className="w-[980px] bg-white rounded-lg px-4 py-8 flex flex-col border border-secondary-100"
      >
        <div className="flex items-center gap-4 py-4">
          <Image className="w-[86px]" src={logo} alt="logo da nodeb" />
          <Typography variant="h4">Formulário de cadastro</Typography>
        </div>

        <CompanyDataForm
          register={register}
          onCompanyDataChange={handleCompanyDataChange}
          onAddNewEcAndAcquirer={handleNewEcAndAcquirer}
        />
        {showCompanyAdminData && (
          <>
            <div>
              <p className="p-4 text-lg font-bold px-2 bg-primary-100 border-primary-200 border">
                Dados do representante
              </p>

              <div className="flex gap-2 border border-slate-200 border-spacing-0">
                <div className="flex-[1]">
                  <div className="flex gap-2 m-4 items-center">
                    <label className="w-[120px] uppercase" htmlFor="email">
                      E-mail
                    </label>
                    <input
                      className={`${
                        errors.repEmail
                          ? "outline-red-400 border-red-400"
                          : "outline-primary-500 border-slate-200 "
                      } p-4 rounded-lg bg-slate-50  border w-[100%]`}
                      type="email"
                      id="email"
                      {...register("repEmail", {
                        required: {
                          value: true,
                          message: "Este campo é obrigatório",
                        },
                        validate: {
                          mathPattern: matchEmailPattern,
                        },
                      })}
                      placeholder="seu@email.com.br"
                    />
                  </div>
                  {errors.repEmail && (
                    <div className="flex justify-end pr-8">
                      <span className="text-red-400">
                        {errors.repEmail.message}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2 m-4 items-center">
                    <label className="w-[120px] uppercase" htmlFor="reprName">
                      Nome
                    </label>
                    <input
                      className={`${
                        errors.repName
                          ? "outline-red-400 border-red-400"
                          : "outline-primary-500 border-slate-200 "
                      } p-4 rounded-lg bg-slate-50  border w-[100%]`}
                      type="text"
                      required
                      id="reprName"
                      {...register("repName", {
                        required: {
                          value: true,
                          message: "Este campo é obrigatório",
                        },
                      })}
                      placeholder="seu nome"
                    />
                  </div>
                  {errors.repName && (
                    <div className="flex justify-end pr-8">
                      <span className="text-red-400">
                        {errors.repName.message}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2 m-4 items-center">
                    <label
                      className="w-[120px] uppercase"
                      htmlFor="clientPhone"
                    >
                      Telefone
                    </label>
                    <input
                      className={`${
                        errors.repPhone
                          ? "outline-red-400 border-red-400"
                          : "outline-primary-500 border-slate-200 "
                      } p-4 rounded-lg bg-slate-50  border w-[100%]`}
                      type="text"
                      id="address"
                      required
                      {...register("repPhone", {
                        required: {
                          value: true,
                          message: "Este campo é obrigatório",
                        },
                        maxLength: 15,
                        validate: {
                          matchPattern: matchPhonePattern,
                        },
                        onChange: (e) => {
                          e.target.value = maskToCellhone(e.target.value);
                        },
                      })}
                      placeholder="(xx) 90000-0000"
                    />
                  </div>
                  {errors.repPhone && (
                    <div className="flex justify-end pr-8">
                      <span className="text-red-400">
                        {errors.repPhone.message}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2 m-4 items-center">
                    <label className="w-[120px] uppercase" htmlFor="document">
                      Documento
                    </label>
                    <input
                      className={`${
                        errors.repDoc
                          ? "outline-red-400 border-red-400"
                          : "outline-primary-500 border-slate-200 "
                      } p-4 rounded-lg bg-slate-50  border w-[100%]`}
                      type="text"
                      id="document"
                      required
                      {...register("repDoc", {
                        required: {
                          value: true,
                          message: "Este campo é obrigatório",
                        },
                        minLength: {
                          value: 14,
                          message: "Número de documento incompleto",
                        },
                        validate: {
                          matchFormula: validateCpf,
                        },
                        onChange: (e) => {
                          e.target.value = maskToCpf(e.target.value);
                        },
                      })}
                      placeholder="000.000.000-00"
                    />
                  </div>

                  {errors.repDoc && (
                    <div className="flex justify-end pr-8">
                      <span className="text-red-400">
                        {errors.repDoc.message}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className="p-4 text-lg font-bold px-2 bg-primary-100 border-primary-200 border">
                Verificação de documentos
              </p>

              <div className="flex flex-col justify-center gap-2 p-4 items-center border border-slate-200 border-spacing-0">
                <label className="uppercase" htmlFor="upload">
                  Doc com foto (ex: rg, cnh):{" "}
                </label>

                <input
                  className="file:cursor-pointer file:bg-secondary-500 file:border-none file:py-2 file:px-4 file:rounded-lg file:text-white"
                  type="file"
                  accept=".pdf,image/*"
                  multiple
                  id="upload"
                />
              </div>

              <p className="p-4 text-lg font-bold px-2 bg-primary-100 border-primary-200 border">
                Dados de acesso
              </p>

              <div className="flex gap-2 border border-slate-200 border-spacing-0 rounded-b-lg">
                <div className="flex gap-2 m-4 items-center flex-1">
                  <label className="w-[120px] uppercase" htmlFor="email_login">
                    E-mail
                  </label>
                  <input
                    className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[100%]"
                    type="email"
                    required
                    id="email_login"
                    {...register("emailLogin")}
                    placeholder="seu@email.com.br"
                  />
                </div>
                <div className="flex gap-2 m-4 items-center flex-1">
                  <label className="w-[120px] uppercase" htmlFor="password">
                    Senha
                  </label>
                  <input
                    className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[100%]"
                    type="password"
                    id="password"
                    required
                    {...register("password")}
                    placeholder="sua senha"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <Link
                href={"/"}
                className="flex gap-2 items-center self-center mt-8 bg-slate-200 py-2 px-8 rounded-lg border-slate-300 border"
              >
                <ArrowArcLeft size={24} /> Voltar
              </Link>

              <button
                type="submit"
                className="flex gap-2 items-center self-center mt-8 bg-primary-500 text-white py-2 px-8 rounded-lg border-primary-600 border"
              >
                <FloppyDiskBack size={24} /> Enviar
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
