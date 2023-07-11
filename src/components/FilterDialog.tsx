import { DashboardContext } from "@/app/context/DashboardContext";
import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { DateTime } from "luxon";
import { MagnifyingGlass, Spinner, X } from "phosphor-react";
import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface FilterDialogProps {
  onClose: () => void;
  isOpen: boolean;
}

enum Period {
  SEVEN = "7d",
  MONTH = "30d",
  QUARTER = "90d",
  CUSTOM = "custom",
}
interface PeriodRange {
  dataInicio: string;
  dataFim: string;
}
const getPeriodInDate = (period: string): PeriodRange => {
  const dateRange: PeriodRange = {
    dataInicio: "",
    dataFim: "",
  };

  switch (period) {
    case Period.SEVEN:
      dateRange.dataInicio = DateTime.now().toISODate() || "";
      dateRange.dataFim = DateTime.now().plus({ days: 7 }).toISODate() || "";
      break;
    case Period.MONTH:
      dateRange.dataInicio = DateTime.now().toISODate() || "";
      dateRange.dataFim = DateTime.now().plus({ months: 1 }).toISODate() || "";
      break;
    case Period.QUARTER:
      dateRange.dataInicio = DateTime.now().toISODate() || "";
      dateRange.dataFim = DateTime.now().plus({ months: 3 }).toISODate() || "";
      break;
  }

  return dateRange;
};

export function FilterDialog({ onClose: onclose, isOpen }: FilterDialogProps) {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("sm");
  const [filterPeriod, setFilterPeriod] = useState("7d");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [range, setRange] = useState({} as PeriodRange);
  const { fetchDashboardData, isLoading } = useContext(DashboardContext);

  useEffect(() => {
    if (filterPeriod === Period.CUSTOM) {
      const rg: PeriodRange = {
        dataInicio: DateTime.fromISO(dataInicio).toISODate() || "",
        dataFim: DateTime.fromISO(dataFim).toISODate() || "",
      };

      setRange(() => rg);
    } else {
      setRange(() => getPeriodInDate(filterPeriod));
    }
  }, [filterPeriod, dataInicio, dataFim]);

  function handleFilterChange(selectedValue: string) {
    if (selectedValue === Period.CUSTOM) {
      setDataInicio("");
      setDataFim("");
    }
    setFilterPeriod(selectedValue);
  }

  function handleChangeDataInicio(value: string) {
    setDataInicio(value);
  }

  function handleChangeDataFim(value: string) {
    setDataFim(value);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await fetchDashboardData({
      ...range,
    });
    onclose();
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
        <form onSubmit={handleSubmit}>
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
              <label>Selecione: </label>
              <div>
                <label htmlFor="dataInicio">De: </label>
                <input
                  className="bg-slate-100 rounded-lg p-2 outline-none"
                  type="date"
                  name="dataInicio"
                  value={dataInicio}
                  onChange={(e) => handleChangeDataInicio(e.target.value)}
                  id="dataInicio"
                />
              </div>
              <div>
                <label htmlFor="dataFim">Até: </label>
                <input
                  className="bg-slate-100 rounded-lg p-2 outline-none"
                  type="date"
                  name="dataFim"
                  value={dataFim}
                  onChange={(e) => handleChangeDataFim(e.target.value)}
                  id="dataFim"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end pt-4">
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
