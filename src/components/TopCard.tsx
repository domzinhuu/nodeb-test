import { formatToCurrency } from "@/utils/helper.functions";
import { DateTime } from "luxon";
import {
  BiCalendarExclamation,
  BiCalendarStar,
  BiTrendingUp,
} from "react-icons/bi";

interface TopCardProps {
  futureSchedule: number;
  nextPayment: any;
  lastPayment: string;
}

function TopCard({ futureSchedule, nextPayment, lastPayment }: TopCardProps) {
  return (
    <div className="grid lg:grid-cols-6 gap-4 p-4">
      <div className="lg:col-span-2 col-span-1 flex bg-white justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">
            {futureSchedule ? (
              formatToCurrency(futureSchedule)
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="text-gray-600">Agenda Futura</p>
        </div>
        <p className="bg-green-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">
            <BiTrendingUp size={28} />
          </span>
        </p>
      </div>
      <div className="lg:col-span-2 col-span-1 flex bg-white justify-between w-full border p-4 rounded">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">
            {lastPayment ? (
              DateTime.fromISO(lastPayment).toFormat("dd/MM/yyyy")
            ) : (
              <p>Caregando...</p>
            )}
          </p>
          <p className="text-gray-600">Último Pagamento</p>
        </div>
        <p className="bg-green-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">
            <BiCalendarExclamation size={28} />
          </span>
        </p>
      </div>

      <div className="lg:col-span-2 col-span-1 flex bg-white justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">
            {nextPayment ? (
              DateTime.fromISO(nextPayment.date).toFormat("dd/MM/yyyy")
            ) : (
              <p>Loading...</p>
            )}
          </p>
          <p className="text-gray-600">Próximo Pagamento</p>
        </div>
        <p className="bg-green-200 w-20 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">
            <BiCalendarStar size={28} />
          </span>
        </p>
      </div>
    </div>
  );
}

export default TopCard;
