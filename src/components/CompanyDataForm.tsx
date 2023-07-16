"use client";
import { PlusCircle, Trash } from "phosphor-react";
import { FieldErrors, UseFormRegister, UseFormReset } from "react-hook-form";
import { AddAcquirerModalForm } from "./AddAcquirerModalForm";
import { useContext, useEffect, useState } from "react";
import {
  AddEcAndAcquirerForm,
  CreateUserContext,
} from "@/app/context/CreateUserContext";
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
import {
  formatToDocument,
  maskDocument,
  maskToPhone,
  matchPhonePattern,
  validateCnpj,
} from "@/utils/helper.functions";
import { CompanyData, HelperService } from "@/services/helpers";
import { CreateUserForm } from "@/app/createUser/page";

interface CompanyDataFormProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<CreateUserForm>;
  onCompanyDataChange: (data: CompanyData | null) => void;
  onAddNewEcAndAcquirer: (data: AddEcAndAcquirerForm) => void;
}

interface EcSelected {
  ecDoc: string;
  ecName: string;
}

export default function CompanyDataForm({
  register,
  errors,
  onCompanyDataChange,
  onAddNewEcAndAcquirer,
}: CompanyDataFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCompanyData, setShowCompanyData] = useState(false);
  const [showDocumentInvalid, setShowDocumentInvalid] = useState(false);
  const [selectedEc, setSelectedEc] = useState<EcSelected | undefined>(
    undefined
  );

  const { createUser, onRemoveAcquirerFromEc, onRemoveEc } =
    useContext(CreateUserContext);

  function handleCloseModalForm() {
    setSelectedEc(undefined);
    setIsOpen(false);
  }

  function handleAddEc(data: AddEcAndAcquirerForm) {
    onAddNewEcAndAcquirer(data);
    setSelectedEc(undefined);
  }

  function handleAddOnlyAcquirer(data: { ecDoc: string; ecName: string }) {
    setSelectedEc(data);
    setIsOpen(true);
  }

  function handleDeleteEc(ec: string) {
    onRemoveEc(ec);
  }

  async function handleSearchCnpjInfo(cnpj: string) {
    const data = await HelperService.getCnpjData(cnpj);
    if (data) {
      setShowCompanyData(true);
      setShowDocumentInvalid(false);
    } else {
      setShowDocumentInvalid(true);
    }

    onCompanyDataChange(data);
  }

  function handleDeleteAcquirer(data: AddEcAndAcquirerForm) {
    onRemoveAcquirerFromEc(data);
  }

  const addedCombo = createUser.ec.combo.added;
  return (
    <section>
      <p className="p-4 mt-6 text-lg font-bold rounded-t-lg px-2 bg-primary-100 border-primary-200 border">
        Dados da Empresa
      </p>

      <div className="border border-slate-200 pb-4">
        <div className="flex flex-col">
          <div className="flex gap-2 m-4 items-center">
            <label className="w-[150px] uppercase" htmlFor="cnpj">
              Cnpj
            </label>
            <input
              className={`${
                errors.companyDocument
                  ? "outline-red-400 border-red-400"
                  : "outline-primary-500 border-slate-200 "
              } p-4 rounded-lg bg-slate-50  border w-[100%]`}
              type="text"
              id="cnpj"
              {...register("companyDocument", {
                required: { value: true, message: "Este campo é obrigatório" },
                minLength:{value:18, message: "O número informado está incompleto"},
                validate: {
                  matchPattern: validateCnpj,
                },
                onChange: (e) => {
                  e.target.value = maskDocument(e.target.value);
                  if (e.target.value.length === 18) {
                    handleSearchCnpjInfo(e.target.value);
                  }
                },
              })}
              placeholder="00.000.000/000-1-00"
            />
          </div>
          {errors.companyDocument && (
            <div className="flex justify-end pr-8">
              <span className="text-red-400">
                {errors.companyDocument.message}
              </span>
            </div>
          )}
        </div>
        {showCompanyData && (
          <>
            <div>
              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="companyName">
                  Nome Fantasia
                </label>
                <input
                  readOnly
                  className="p-4 rounded-lg read-only:bg-slate-100 border-slate-200 border w-full outline-primary-500"
                  type="text"
                  id="companyName"
                  {...register("companyName")}
                  placeholder="Nome fantasia"
                />
              </div>

              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="cep">
                  Cep
                </label>
                <input
                  readOnly
                  className={`${
                    errors.zipCode
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[100%]`}
                  type="text"
                  id="cep"
                  {...register("zipCode", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                  placeholder="cep"
                />
              </div>
              {errors.zipCode && (
                <div className="flex justify-end pr-8">
                  <span className="text-red-400">{errors.zipCode.message}</span>
                </div>
              )}

              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="street">
                  Endereço
                </label>
                <input
                  readOnly
                  className={`${
                    errors.street
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[88%]`}
                  type="text"
                  id="street"
                  {...register("street", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                  placeholder="Logradouro"
                />
                <input
                  className={`${
                    errors.number
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[11.3%]`}
                  type="number"
                  id="number"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                  placeholder="Nº"
                />
              </div>
              {(errors.street || errors.number) && (
                <div className="flex justify-end pr-8">
                  <span className="text-red-400">{errors.street?.message}</span>
                  <span className="text-red-400">{errors.number?.message}</span>
                </div>
              )}

              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="neighborhood">
                  Localidade
                </label>
                <input
                  readOnly
                  className={`${
                    errors.neighborhood
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[44.3%]`}
                  type="text"
                  id="neighborhood"
                  {...register("neighborhood", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                  placeholder="Bairro"
                />
                <input
                  readOnly
                  className={`${
                    errors.city
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[43%]`}
                  type="text"
                  id="city"
                  {...register("city", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                  placeholder="Cidade"
                />
                <input
                  readOnly
                  className={`${
                    errors.uf
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[11.3%]`}
                  type="string"
                  id="uf"
                  {...register("uf", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                  })}
                  placeholder="UF"
                />
              </div>
              {(errors.neighborhood || errors.city || errors.uf) && (
                <div className="flex justify-end pr-8">
                  <span className="text-red-400">{errors.city?.message}</span>
                  <span className="text-red-400">{errors.uf?.message}</span>
                  <span className="text-red-400">
                    {errors.neighborhood?.message}
                  </span>
                </div>
              )}

              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="info">
                  Referência
                </label>
                <input
                  className=" outline-primary-500 p-4 rounded-lg bg-white border-slate-200 border w-full"
                  type="text"
                  id="info"
                  {...register("info")}
                  placeholder="Bloco, apto, etc..."
                />
              </div>

              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="phone">
                  Telefone
                </label>
                <input
                  className={`${
                    errors.companyPhone
                      ? "outline-red-400 border-red-400"
                      : "outline-primary-500 border-slate-200 "
                  } p-4 rounded-lg bg-slate-50  border w-[100%]`}
                  type="text"
                  id="phone"
                  {...register("companyPhone", {
                    required: {
                      value: true,
                      message: "Este campo é obrigatório",
                    },
                    validate: {
                      matchPattern: matchPhonePattern,
                    },
                    onChange: (e) => {
                      e.target.value = maskToPhone(e.target.value);
                    },
                  })}
                  placeholder="(xx) 0000-0000"
                />
              </div>
              <div className="flex gap-2 m-4 items-center">
                <label className="w-[150px] uppercase" htmlFor="revenue">
                  Faturamento
                </label>

                <select
                  id="revenue"
                  className="p-4 rounded-lg bg-white border-slate-200 border w-full"
                  placeholder="Selecione"
                  {...register("revenue")}
                >
                  <option value="R$ 0,01 a R$ 5.000,00">
                    R$ 0,01 a R$ 5.000,00
                  </option>
                  <option value="R$ 5.001,00 a R$ 20.000,00">
                    R$ 5.001,00 a R$ 20.000,00
                  </option>
                  <option value="R$ 20.001,00 a R$ 100.000,00">
                    R$ 20.001,00 a R$ 100.000,00
                  </option>
                  <option value="R$ 100.001,00 a R$ 1.000.000,00">
                    R$ 100.001,00 a R$ 1.000.000,00
                  </option>
                  <option value="mais de R$ 1.000.000,00">
                    mais de R$ 1.000.000,00
                  </option>
                </select>
              </div>
            </div>

            <div>
              <p className="p-4 my-6 text-lg font-bold rounded-lg px-2">
                Cadastre suas maquininhas.
              </p>

              {(!addedCombo || Object.keys(addedCombo).length === 0) && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="flex gap-2 p-2 text-white rounded-lg bg-secondary-500 border border-secondary-700"
                  >
                    <PlusCircle size={24} /> Nova Maquininha
                  </button>
                </div>
              )}

              {addedCombo && Object.keys(addedCombo).length > 0 && (
                <div className="flex flex-col">
                  <Accordion expanded={false} className="w-full m-0 p-0">
                    <div className="flex w-full gap-4 justify-between items-center bg-primary-100 border border-primary-200 p-4 rounded-b-none rounded-t-lg">
                      <Typography variant="h6">
                        Comércios adicionados
                      </Typography>

                      <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 text-primary-500 hover:text-white hover:bg-primary-500 p-2 rounded-lg transition-all duration-100"
                      >
                        <PlusCircle size={20} /> Comércio
                      </button>
                    </div>
                  </Accordion>

                  {Object.keys(addedCombo).map((key) => (
                    <Accordion key={key} className="w-full">
                      <AccordionSummary
                        expandIcon={<BiChevronDown size={20} />}
                      >
                        <div className="flex w-full gap-4 justify-between items-center">
                          <div>
                            <Typography variant="body1">
                              {addedCombo[key][0].ecName}
                            </Typography>
                            <Typography
                              className="text-slate-600 font-bold"
                              variant="body1"
                            >
                              <div className="flex gap-4 items-center">
                                {formatToDocument(key)}{" "}
                                <button
                                  title="Remover Comércio"
                                  onClick={() => handleDeleteEc(key)}
                                  className="p-2 rounded-md hover:bg-slate-100 transition-all duration-100"
                                >
                                  <Trash
                                    size={18}
                                    className="text-primary-500"
                                  />{" "}
                                </button>
                              </div>
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
                                    type="button"
                                    onClick={() =>
                                      handleAddOnlyAcquirer({
                                        ecDoc: addedCombo[key][0].ecDoc,
                                        ecName: addedCombo[key][0].ecName,
                                      })
                                    }
                                    className="flex items-center gap-2 transition-all duration-100 text-secondary-500 hover:bg-secondary-500 hover:text-white p-2 rounded-md"
                                  >
                                    <PlusCircle size={24} />
                                    Adicionar
                                  </button>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {addedCombo[key].map(
                                (data: AddEcAndAcquirerForm) => (
                                  <TableRow key={data.acqDoc}>
                                    <TableCell>{data.acqName}</TableCell>
                                    <TableCell>
                                      {formatToDocument(data.acqDoc)}
                                    </TableCell>
                                    <TableCell>
                                      {addedCombo[key].length > 1 && (
                                        <div className="flex justify-end">
                                          <button
                                            title="Remover Maquininha"
                                            onClick={() =>
                                              handleDeleteAcquirer(data)
                                            }
                                            className="bg-red-400 text-white border borderred-500 p-1 rounded-md"
                                          >
                                            <Trash size={24} />
                                          </button>
                                        </div>
                                      )}
                                    </TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <AddAcquirerModalForm
        onAdd={handleAddEc}
        isOpen={isOpen}
        selectedEc={selectedEc}
        onClose={handleCloseModalForm}
      />
    </section>
  );
}
