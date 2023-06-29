import { formatToCurrency } from "@/utils/helper.functions";
import { Info } from "phosphor-react";
import { BiCalendarExclamation, BiTrendingUp } from "react-icons/bi";
import * as Tooltip from "@radix-ui/react-tooltip";
import { NodebTooltip } from "./Tooltip";
import React from "react";

interface TopCardProps {
  futureSchedule: number;
  nextPayment: any;
  lastPayment: string;
}

function TopCard({ futureSchedule, nextPayment, lastPayment }: TopCardProps) {
  return (
    <div className="grid lg:grid-cols-6 gap-4 p-4">
      <div className="lg:col-span-4 col-span-1 flex bg-white justify-between w-full border p-4 rounded-lg h-[106px]">
        <div className="flex flex-col w-full pb-4">
          <span className="text-2xl font-bold">
            {futureSchedule ? (
              <div className="flex gap-3 items-center">
                {formatToCurrency(futureSchedule)}

                <NodebTooltip
                  content={
                    <React.Fragment>
                      <p>
                        Aqui é a soma do valor que você tem a receber em todas
                        as credenciadoras até <b>[DATA_AQUI]</b> que é a data do
                        último pagamento agendado.
                      </p>
                    </React.Fragment>
                  }
                >
                  <Info size={24} className="text-purple-700 cursor-pointer" />
                </NodebTooltip>
              </div>
            ) : (
              <span>Loading...</span>
            )}
          </span>
          <span className="text-gray-600">
            Valor total a receber até: <strong>22/11/2042</strong>
          </span>
        </div>
        <span className="bg-green-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">
            <BiTrendingUp size={28} />
          </span>
        </span>
      </div>

      <div className="lg:col-span-2 col-span-1 flex bg-white justify-between w-full border p-4 rounded-lg h-[106px]">
        <div className="flex flex-col w-full pb-4">
          <span className="text-2xl font-bold">Pagamentos Previstos</span>
          <span className="text-gray-600">
            11/06/2023: <strong>{formatToCurrency(1000)}</strong>
          </span>
          <span className="text-gray-600">
            11/06/2023: <strong>{formatToCurrency(1000)}</strong>
          </span>
        </div>
        <span className="bg-green-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">
            <BiCalendarExclamation size={28} />
          </span>
        </span>
      </div>

      {/*  <div className="lg:col-span-2 col-span-1 flex bg-white justify-between w-full border p-4 rounded-lg h-[106px]">
        <div className="flex flex-col w-full pb-4">
          <span className="text-xl font-bold">
            {nextPayment ? (
              DateTime.fromISO(nextPayment).toFormat("dd/MM/yyyy")
            ) : (
              <span>Loading...</span>
            )}
          </span>
          <span className="text-gray-600">Próximo Pagamento</span>
        </div>
        <span className="bg-green-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">
            <BiCalendarStar size={28} />
          </span>
        </span>
      </div> */}
    </div>
  );
}

export default TopCard;
