import { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskToCnpj } from "@/utils/helper.functions";

const addAcquirerModalSchema = z.object({
  ecDoc: z
    .string()
    .min(18, { message: "Número de documento inválido ou não preenchido." }),
  acqDoc: z
    .string()
    .min(18, { message: "Número de documento inválido ou não preenchido." }),
});

type AcquirerModalForm = z.infer<typeof addAcquirerModalSchema>;

interface AddAcquirerModalFormProps {
  onAdd: (data: { ecDoc: string; acqDoc: string }) => void;
  onClose: () => void;
  isOpen: boolean;
  addAcquirerForEc: string | undefined;
}

export function AddAcquirerModalForm({
  onAdd,
  addAcquirerForEc,
  onClose,
  isOpen,
}: AddAcquirerModalFormProps) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AcquirerModalForm>({
    resolver: zodResolver(addAcquirerModalSchema),
  });

  useEffect(() => {
    reset({ ecDoc: addAcquirerForEc });
  }, [addAcquirerForEc, reset, isOpen]);

  function handleAddAcquirer(data: AcquirerModalForm) {
    onAdd(data);
    onClose();
  }

  function handleClose() {
    onClose();
  }
  return (
    <Dialog open={isOpen} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className="p-4 m-0 mb-4 w-full font-bold bg-primary-100 border-primary-200 border">
        Cadastre uma maquininha
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleAddAcquirer)} noValidate>
          <div className="flex flex-col pb-4">
            <label className="pb-2" htmlFor="ecDoc">
              DOCUMENTO <small>(Documento da Empresa)</small>:{" "}
            </label>
            <input
              type=""
              readOnly={addAcquirerForEc !== undefined}
              className={`ecDoc bg-slate-50 border  rounded-lg p-4 valid:border-secondary-500 ${
                errors.acqDoc
                  ? "outline-red-400 border-red-400"
                  : "border-slate-200 outline-primary-400 "
              } `}
              id="ecDoc"
              required
              {...register("ecDoc", {
                onChange: (e) => {
                  e.target.value = maskToCnpj(e.target.value);
                },
              })}
              placeholder="00.000.000/0001-00"
            />
            <span className="text-red-400 text-sm  pl-2 pt-2">
              {errors.ecDoc?.message}
            </span>
          </div>
          <div className="flex flex-col pb-4">
            <label className="pb-2" htmlFor="adqDoc">
              MAQUININHA <small>(Documento da credenciadora)</small>:
            </label>
            <input
              type=""
              className={`peer bg-slate-50 border rounded-lg p-4 valid:border-secondary-500 ${
                errors.acqDoc
                  ? "outline-red-400 border-red-400"
                  : "border-slate-200 outline-primary-400 "
              }`}
              id="adqDoc"
              required
              {...register("acqDoc", {
                onChange: (e) => {
                  e.target.value = maskToCnpj(e.target.value);
                },
              })}
              placeholder="00.000.000/0001-00"
            />

            <span className="text-red-400 text-sm pl-4 pt-2">
              {errors.acqDoc?.message}
            </span>
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
              type="submit"
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
