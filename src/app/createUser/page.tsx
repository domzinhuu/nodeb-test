"use client";
import { Typography } from "@mui/material";
import logo from "../../../public/logo.png";
import Image from "next/image";
import { Camera } from "phosphor-react";

export default function CreateUserPage() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center text-slate-700">
      <div className="w-[980px] bg-white rounded-lg p-4 flex flex-col border border-secondary-100">
        <div className="flex items-center gap-4">
          <Image className="w-[86px]" src={logo} alt="logo da nodeb" />
          <Typography variant="h4">Formulário de cadastro</Typography>
        </div>

        <p className="p-4 my-6 text-lg font-bold rounded-lg px-2 bg-primary-100 border-primary-200 border">
          Dados da Empresa
        </p>

        <div>
          <div className="flex gap-2 m-4 items-center">
            <label className="w-[120px] uppercase" htmlFor="cnpj">
              Cnpj
            </label>
            <input
              className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[50%]"
              type="text"
              id="cnpj"
              placeholder="00.000.000/000-1-00"
            />
          </div>
          <div className="flex gap-2 m-4 items-center">
            <label className="w-[120px] uppercase" htmlFor="address">
              Endereço
            </label>
            <input
              className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[50%]"
              type="text"
              id="address"
              placeholder="logradouro, numero, complemento"
            />
          </div>
          <div className="flex gap-2 m-4 items-center">
            <label className="w-[120px] uppercase" htmlFor="phone">
              Telefone
            </label>
            <input
              className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[50%]"
              type="text"
              id="phone"
              placeholder="(xx) 0000-0000"
            />
          </div>
        </div>

        <p className="p-4 my-6 text-lg font-bold rounded-lg px-2 bg-primary-100 border-primary-200 border">
          Dados do representante
        </p>

        <div className="flex gap-2">
          <div className="flex-[2]">
            <div className="flex gap-2 m-4 items-center">
              <label className="w-[120px] uppercase" htmlFor="email">
                E-mail
              </label>
              <input
                className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[100%]"
                type="email"
                id="email"
                placeholder="seu@email.com.br"
              />
            </div>
            <div className="flex gap-2 m-4 items-center">
              <label className="w-[120px] uppercase" htmlFor="reprName">
                Nome
              </label>
              <input
                className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[100%]"
                type="text"
                id="reprName"
                placeholder="seu nome"
              />
            </div>
            <div className="flex gap-2 m-4 items-center">
              <label className="w-[120px] uppercase" htmlFor="clientPhone">
                Telefone
              </label>
              <input
                className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[100%]"
                type="text"
                id="address"
                placeholder="(xx) 90000-0000"
              />
            </div>
            <div className="flex gap-2 m-4 items-center">
              <label className="w-[120px] uppercase" htmlFor="document">
                Documento
              </label>
              <input
                className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[100%]"
                type="text"
                id="document"
                placeholder="000.000.000-00"
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="bg-slate-100 border border-secondary-300 w-[150px] h-[180px] rounded-lg"></div>
            <button className="bg-slate-100 py-1 px-2 rounded-lg border border-slate-300 flex items-center gap-1">
              <Camera size={18} /> Procurar arquivo
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="self-end bg-primary-500 text-white py-2 px-8 rounded-lg border-primary-800 border"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
