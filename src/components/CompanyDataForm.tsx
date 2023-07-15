"use client";
import { PlusCircle } from "phosphor-react";
import { UseFormRegister } from "react-hook-form";
import { AddAcquirerModalForm } from "./AddAcquirerModalForm";
import { useState } from "react";
import { maskToCnpj } from "@/utils/helper.functions";

interface CompanyDataFormProps {
  register: UseFormRegister<any>;
}

export default function CompanyDataForm({ register }: CompanyDataFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleCloseModalForm() {
    setIsOpen(false);
  }

  function handleAddAcquirer(data: any) {
    console.log(data);
  }

  return (
    <section className="">
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
            {...register("companyDocument", {
              onChange: (e) => {
                e.target.value = maskToCnpj(e.target.value);
              },
            })}
            placeholder="00.000.000/000-1-00"
          />
        </div>
        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="address">
            Endereço
          </label>
          <input
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[38%]"
            type="text"
            id="address"
            {...register("street")}
            placeholder="Logradouro"
          />
          <input
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[11.3%]"
            type="number"
            id="number"
            {...register("number")}
            placeholder="Nº"
          />
        </div>
        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="neighborhood">
            Localidade
          </label>
          <input
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[19.3%]"
            type="text"
            id="neighborhood"
            {...register("neighborhood")}
            placeholder="Bairro"
          />
          <input
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[18%]"
            type="text"
            id="city"
            {...register("city")}
            placeholder="Cidade"
          />
          <input
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[11.3%]"
            type="string"
            id="uf"
            {...register("uf")}
            placeholder="UF"
          />
        </div>
        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="info">
            Complemento
          </label>
          <input
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[50%]"
            type="text"
            id="info"
            placeholder="Bloco, apto, etc..."
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

        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="revenue">
            Vol. Vendas
          </label>

          <select
            id="revenue"
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[50%]"
            placeholder="Selecione"
          >
            <option value="1">R$ 0,01 a R$ 5.000,00</option>
            <option value="2">R$ 5.001,00 a R$ 20.000,00</option>
            <option value="3">R$ 20.001,00 a R$ 100.000,00</option>
            <option value="4">R$ 100.001,00 a R$ 1.000.000,00</option>
            <option value="5">mais de R$ 1.000.000,00</option>
          </select>
        </div>
      </div>

      <div>
        <p className="p-4 my-6 text-lg font-bold rounded-lg px-2">
          Cadastre suas maquininhas.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="flex gap-2 p-2 text-white rounded-lg bg-secondary-500 border border-secondary-700"
          >
            <PlusCircle size={24} /> Nova Maquininha
          </button>
        </div>
      </div>

      <AddAcquirerModalForm
        onAdd={handleAddAcquirer}
        isOpen={isOpen}
        onClose={handleCloseModalForm}
      />
    </section>
  );
}
