"use client";
import { PlusCircle, Trash } from "phosphor-react";
import { UseFormRegister } from "react-hook-form";
import { AddAcquirerModalForm } from "./AddAcquirerModalForm";
import { useContext, useState } from "react";
import { CreateUserContext } from "@/app/context/CreateUserContext";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { maskToCnpj, maskToPhone } from "@/utils/helper.functions";

interface CompanyDataFormProps {
  register: UseFormRegister<any>;
  onAddNewEcAndAcquirer: (ecDoc: string, acqDoc: string) => void;
}

export default function CompanyDataForm({
  register,
  onAddNewEcAndAcquirer,
}: CompanyDataFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ecToAdd, setEcToAdd] = useState<string | undefined>(undefined);
  const { createUser, onRemoveAcquirerFromEc, onRemoveEc } =
    useContext(CreateUserContext);

  function handleCloseModalForm() {
    setEcToAdd(undefined);
    setIsOpen(false);
  }

  function handleAddEc(data: any) {
    onAddNewEcAndAcquirer(data.ecDoc, data.acqDoc);
    setEcToAdd(undefined);
  }

  function handleAddOnlyAcquirer(ecDoc: string) {
    setEcToAdd(ecDoc);
    setIsOpen(true);
  }

  function handleDeleteEc(ec: string) {
    onRemoveEc(ec);
  }

  function handleDeleteAcquirer(ec: string, acquirer: string) {
    onRemoveAcquirerFromEc(ec, acquirer);
  }

  const addedCombo = createUser.ec.combo.added;
  return (
    <section>
      <p className="p-4 my-6 text-lg font-bold rounded-lg px-2 bg-primary-100 border-primary-200 border">
        Dados da Empresa
      </p>

      <div>
        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="cnpj">
            Cnpj
          </label>
          <input
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-full"
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
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-[88%] outline-primary-500"
            type="text"
            id="address"
            {...register("street")}
            placeholder="Logradouro"
          />
          <input
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-[11.3%]"
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
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-[44.3%]"
            type="text"
            id="neighborhood"
            {...register("neighborhood")}
            placeholder="Bairro"
          />
          <input
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-[43%]"
            type="text"
            id="city"
            {...register("city")}
            placeholder="Cidade"
          />
          <input
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-[11.3%]"
            type="string"
            id="uf"
            {...register("uf")}
            placeholder="UF"
          />
        </div>
        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="info">
            Referência
          </label>
          <input
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-full"
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
            className=" outline-primary-500 p-4 rounded-lg bg-slate-50 border-slate-200 border w-full"
            type="text"
            id="phone"
            {...register("companyPhone", {
              onChange: (e) => {
                e.target.value = maskToPhone(e.target.value);
              },
            })}
            placeholder="(xx) 0000-0000"
          />
        </div>

        <div className="flex gap-2 m-4 items-center">
          <label className="w-[120px] uppercase" htmlFor="revenue">
            Vol. Vendas
          </label>

          <select
            id="revenue"
            className="p-4 rounded-lg bg-slate-50 border-slate-200 border w-full"
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

        {!addedCombo && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex gap-2 p-2 text-white rounded-lg bg-secondary-500 border border-secondary-700"
            >
              <PlusCircle size={24} /> Nova Maquininha
            </button>
          </div>
        )}

        {addedCombo && (
          <div className="flex flex-col">
            <Accordion
              expanded={false}
              className="w-full bg-primary-100 border border-primary-200"
            >
              <AccordionSummary>
                <div className="flex w-full gap-4 justify-between items-center">
                  <Typography variant="h6">Comércios adicionados</Typography>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 text-primary-500 hover:text-white hover:bg-primary-500 p-2 rounded-lg transition-all duration-100"
                  >
                    <PlusCircle size={20} /> Comércio
                  </button>
                </div>
              </AccordionSummary>
              <AccordionDetails></AccordionDetails>
            </Accordion>

            {Object.keys(addedCombo).map((key) => (
              <Accordion key={key} className="w-full">
                <AccordionSummary expandIcon={<BiChevronDown size={20} />}>
                  <div className="flex w-full gap-4 justify-between items-center">
                    <div>
                      <Typography variant="body1">
                        Nome ou apelido do comércio
                      </Typography>
                      <Typography
                        className="text-slate-600 font-bold"
                        variant="body1"
                      >
                        {key}
                      </Typography>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow className="bg-slate-50">
                          <TableCell className="font-bold" colSpan={2}>
                            Maquininhas adicionadas
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              onClick={() => handleAddOnlyAcquirer(key)}
                              className="flex items-center gap-2 transition-all duration-100 text-secondary-500 hover:bg-secondary-500 hover:text-white p-2 rounded-md"
                            >
                              <PlusCircle size={24} />
                              Adicionar
                            </button>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {addedCombo[key].map((acquirer: string) => (
                          <TableRow key={acquirer}>
                            <TableCell>Nome ou apelido do adquirente</TableCell>
                            <TableCell>{acquirer}</TableCell>
                            <TableCell>
                              {addedCombo[key].length > 1 && (
                                <button
                                  onClick={() =>
                                    handleDeleteAcquirer(key, acquirer)
                                  }
                                  className="bg-red-400 text-white border borderred-500 p-1 rounded-md"
                                >
                                  <Trash size={24} />
                                </button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}
      </div>

      <AddAcquirerModalForm
        onAdd={handleAddEc}
        isOpen={isOpen}
        addAcquirerForEc={ecToAdd}
        onClose={handleCloseModalForm}
      />
    </section>
  );
}
