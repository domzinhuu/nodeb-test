import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { X } from "phosphor-react";
import React, { useState } from "react";

interface FilterDialogProps {
  onclose: () => void;
  isOpen: boolean;
}

export function FilterDialog({ onclose, isOpen }: FilterDialogProps) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");
  const [filterPeriod, setFilterPeriod] = useState("7d");

  function handleFilterChange(selectedValue: string) {
    setFilterPeriod(selectedValue);
  }

  const showCustomInputs = filterPeriod === "custom";
  return (
    <Dialog open={isOpen} fullWidth={fullWidth} maxWidth={maxWidth}>
      <DialogTitle className="flex items-center justify-between">
        <span>Selecione o período</span>
        <button onClick={onclose}>
          <X size={18} />
        </button>
      </DialogTitle>
      <DialogContent>
        <form>
          <div className="flex items-center gap-4">
            <label htmlFor="period">Período: </label>
            <select
              id="period"
              className="outline-none w-full bg-slate-100 p-2 rounded-lg"
              value={filterPeriod}
              onChange={(e) => handleFilterChange(e.target.value)}
            >
              <option value="7d">7 dias</option>
              <option value="30d">30 dias</option>
              <option value="90d">90 dias</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          {showCustomInputs && (
            <div className="flex items-center gap-4 py-4">
              <label>Custom: </label>
              <div>
                <label htmlFor="startAt">De: </label>
                <input
                  className="bg-slate-100 rounded-lg p-2 outline-none"
                  type="date"
                  name="startAt"
                  id="startAt"
                />
              </div>
              <div>
                <label htmlFor="endAt">Até: </label>
                <input
                  className="bg-slate-100 rounded-lg p-2 outline-none"
                  type="date"
                  name="endAt"
                  id="endAt"
                />
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
