import { DashboardContext } from "@/app/context/DashboardContext";
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
  Theme,
  useTheme,
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

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [brandName, setBrandName] = React.useState<string[]>([]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    "82.413.081/0001-16",
    "22.222.222/0001-22",
    "33.333.333/0001-33",
  ];
  const brands = ["ACC", "ECC", "ECD", "HCC", "MCC", "VCC", "VCD"];

  const { isLoading } = useContext(DashboardContext);

  function handleFilterChange() {}

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleBrandChange = (event: SelectChangeEvent<typeof brandName>) => {
    const {
      target: { value },
    } = event;
    setBrandName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  async function handleSubmit(event: FormEvent) {
    onclose();
  }

  return (
    <Dialog open={isOpen} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className="flex flex-col justify-between">
        <button onClick={onclose} className="self-end pb-4">
          <X size={18} />
        </button>
        <span>Use os campos abaixo para modificar a exibição dos dados.</span>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Credenciadoras</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Credenciadoras" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Bandeiras</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-brand-multiple-chip"
            multiple
            value={brandName}
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
            MenuProps={MenuProps}
          >
            {brands.map((brand) => (
              <MenuItem
                key={brand}
                value={brand}
                style={getStyles(brand, brandName, theme)}
              >
                {brand}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-end pt-4">
            <button
              className="flex items-center gap-2 bg-purple-700 text-white rounded-lg p-2"
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
