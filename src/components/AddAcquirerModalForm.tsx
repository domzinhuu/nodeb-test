import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogProps } from "@mui/material";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatToDocument, maskDocument } from "@/utils/helper.functions";
import { AddEcAndAcquirerForm } from "@/app/context/CreateUserContext";

const addAcquirerModalSchema = z.object({
  ecName: z.string(),
  acqName: z.string(),
  ecDoc: z
    .string()
    .min(18, { message: "Número de documento inválido ou não preenchido." }),
  acqDoc: z
    .string()
    .min(18, { message: "Número de documento inválido ou não preenchido." }),
});

type AcquirerModalForm = z.infer<typeof addAcquirerModalSchema>;

interface AddAcquirerModalFormProps {
  onAdd: (data: AddEcAndAcquirerForm) => void;
  onClose: () => void;
  isOpen: boolean;
  selectedEc: { ecDoc: string; ecName: string } | undefined;
}

export function AddAcquirerModalForm({
  onAdd,
  selectedEc,
  onClose,
  isOpen,
}: AddAcquirerModalFormProps) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AcquirerModalForm>({
    resolver: zodResolver(addAcquirerModalSchema),
  });

  useEffect(() => {
    const document = formatToDocument(selectedEc?.ecDoc);
    reset({
      ecDoc: document,
      ecName: selectedEc?.ecName,
    });
  }, [selectedEc, reset, isOpen]);

  function handleAddAcquirer(data: AcquirerModalForm) {
    onAdd(data);
    onClose();
  }

  function handleClose() {
    onClose();
  }
  return (
    <Dialog
      open={isOpen}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      PaperProps={{ sx: { borderRadius: "6px" } }}
    >
      <p className="py-6 px-4 w-full text-lg font-bold bg-primary-100 border-primary-200 border">
        {selectedEc ? "Adicione" : "Cadastre"} uma maquininha
      </p>
      <DialogContent>
        <form className="py-4" id="addAcquierForm" noValidate>
          <div className="flex pb-4 gap-2 mb-4">
            <div className="flex-1">
              <label htmlFor="ecDoc">
                DOCUMENTO <small>(Doc. Empresa)</small>:{" "}
              </label>
              <input
                type="text"
                readOnly={selectedEc !== undefined}
                className={`w-full bg-slate-50 border mt-2 rounded-lg p-4 valid:border-secondary-500 read-only:text-gray-500 read-only:bg-gray-200 ${
                  errors.acqDoc
                    ? "outline-red-400 border-red-400"
                    : "border-slate-200 outline-primary-400 "
                } `}
                id="ecDoc"
                required
                {...register("ecDoc", {
                  onChange: (e) => {
                    e.target.value = maskDocument(e.target.value);
                  },
                })}
                placeholder="00.000.000/0001-00"
              />
              <span className="text-red-400 text-sm  pl-2 pt-2">
                {errors.ecDoc?.message}
              </span>
            </div>

            <div className="flex-1">
              <label className="pb-4" htmlFor="ecName">
                NOME <small>(Comércio)</small>:{" "}
              </label>
              <input
                type="text"
                readOnly={selectedEc !== undefined}
                className="bg-slate-50 border mt-2 rounded-lg p-4 w-full outline-primary-400 read-only:text-gray-500 read-only:bg-gray-200"
                id="ecName"
                placeholder="Nome ou apelido"
                {...register("ecName")}
              />
            </div>
          </div>

          <div className="flex pb-4 gap-2 items-start">
            <div className="flex-1">
              <label htmlFor="adqDoc">
                MAQUININHA <small>(Doc. credenciadora)</small>:
              </label>
              <input
                type="text"
                className={`peer w-full  mt-2 bg-slate-50 border rounded-lg p-4 valid:border-secondary-500 ${
                  errors.acqDoc
                    ? "outline-red-400 border-red-400"
                    : "border-slate-200 outline-primary-400 "
                }`}
                id="adqDoc"
                required
                {...register("acqDoc", {
                  onChange: (e) => {
                    e.target.value = maskDocument(e.target.value);
                  },
                })}
                placeholder="00.000.000/0001-00"
              />

              <span className="text-red-400 text-sm pl-4 pt-2">
                {errors.acqDoc?.message}
              </span>
            </div>

            <div className="flex-1">
              <label htmlFor="acqName">
                NOME <small>(Credenciadora)</small>:{" "}
              </label>
              <input
                type="text"
                className="bg-slate-50 border mt-2 rounded-lg p-4 w-full outline-primary-400"
                id="acqName"
                {...register("acqName")}
                placeholder="Nome ou apelido"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 border rounded-lg border-slate-400 bg-slate-300"
            >
              Fechar
            </button>
            <button
              form="addAcquierForm"
              type="button"
              onClick={handleSubmit(handleAddAcquirer)}
              className="px-4 py-2 border rounded-lg border-primary-600 bg-primary-500 text-white"
            >
              Gravar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
