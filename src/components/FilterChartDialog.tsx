import { DashboardContext } from "@/app/context/DashboardContext";
import { formatToDocument } from "@/utils/helper.functions";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { MagnifyingGlass, Spinner, X } from "phosphor-react";
import React, { FormEvent, useContext, useState } from "react";

interface FilterChartDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

export function FilterChartDialog({
  onClose: onclose,
  isOpen,
}: FilterChartDialogProps) {
  const [fullWidth] = useState(true);
  const [maxWidth] = useState<DialogProps["maxWidth"]>("sm");

  const [selectedAcquirerName, setSelectedAcquirerName] = useState<string[]>(
    []
  );
  const [selectedBrandName, setSelectedBrandName] = useState<string[]>([]);

  const { isLoading, filterChartData, acquirersName, brandsName } =
    useContext(DashboardContext);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedAcquirerName>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedAcquirerName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleBrandChange = (
    event: SelectChangeEvent<typeof selectedBrandName>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedBrandName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    filterChartData({
      acquirers: selectedAcquirerName,
      brands: selectedBrandName,
    });
    onclose();
  }

  return (
    <Dialog open={isOpen} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className="flex flex-col justify-between">
        <button onClick={onclose} className="self-end pb-4">
          <X size={18} />
        </button>
        <span className="text-base pb-2">
          Use os campos abaixo para modificar a exibição dos dados dos gráficos.
        </span>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col pt-4">
            <FormControl>
              <InputLabel id="demo-multiple-chip-label">
                Credenciadoras
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectedAcquirerName}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Credenciadoras"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {acquirersName.map((acq: any) => (
                  <MenuItem key={acq.document} value={acq.document}>
                    {formatToDocument(acq.document)}-{acq.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ marginTop: 2, marginBottom: 2 }}>
              <InputLabel id="demo-multiple-chip-label">Bandeiras</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-brand-multiple-chip"
                multiple
                value={selectedBrandName}
                onChange={handleBrandChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Bandeiras" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {brandsName.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="flex justify-end py-2">
            <button
              className="flex items-center gap-2 bg-primary-500 text-white rounded-lg p-2"
              type="submit"
            >
              {isLoading && (
                <Spinner className="animate-spin duration-200" size={18} />
              )}
              {!isLoading && <MagnifyingGlass size={18} />}
              Pesquisar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
