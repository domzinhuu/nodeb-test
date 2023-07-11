import { formatDate, formatToCurrency } from "@/utils/helper.functions";
import { Info } from "phosphor-react";
import { BiCalendarExclamation, BiTrendingUp } from "react-icons/bi";
import { NodebTooltip } from "./Tooltip";
import React from "react";

interface TopCardProps {
  futureSchedule: number;
  nextPayment: any;
  lastPayment: string;
  current: any;
}

function TopCard({
  futureSchedule,
  nextPayment,
  current,
  lastPayment,
}: TopCardProps) {
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
                        as credenciadoras até <b>{formatDate(lastPayment)}</b>{" "}
                        que é a data do último pagamento agendado.
                      </p>
                    </React.Fragment>
                  }
                >
                  <Info size={24} className="text-primary-500 cursor-pointer" />
                </NodebTooltip>
              </div>
            ) : (
              <span>Loading...</span>
            )}
          </span>
          <span className="text-gray-600">
            Valor total a receber até:{" "}
            <strong>{lastPayment ? formatDate(lastPayment) : ""}</strong>
          </span>
        </div>
        <span className="bg-secondary-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-secondary-700 text-lg">
            <BiTrendingUp size={28} />
          </span>
        </span>
      </div>

      <div className="lg:col-span-2 col-span-1 flex bg-white justify-between w-full border p-4 rounded-lg h-[106px]">
        {(nextPayment || current) && (
          <div className="flex flex-col w-full pb-4">
            <span className="text-2xl font-bold">Pagamentos Previstos</span>
            <span className="text-gray-600">
              {formatDate(current?.date)}:{" "}
              <strong>{formatToCurrency(current?.amount)}</strong>
            </span>
            <span className="text-gray-600">
              {formatDate(nextPayment?.date)}:{" "}
              <strong>{formatToCurrency(nextPayment?.amount)}</strong>
            </span>
          </div>
        )}

        <span className="bg-secondary-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-secondary-700 text-lg">
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
