import BarChart from "@/components/BarChart";
import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import TopCard from "@/components/TopCard";
import { buildResponseData } from "@/utils/helper.functions";
import { filter } from "lodash";
import mockData from "../../data/mock.json";

function getDashboardDataReq() {
  const data = buildResponseData();
  const consolidateData = filter(data, (item: any) => item);
  return {
    futureSchedule: mockData.agendaFutura,
    consolidateData,
    lastPayment: mockData.ultimoPagamento,
    nextPayment: mockData.proximo,
  };
}

export default function Dashboard() {
  const { consolidateData, futureSchedule, lastPayment, nextPayment } =
    getDashboardDataReq();

  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <TopCard
        futureSchedule={Number(futureSchedule)}
        lastPayment={lastPayment}
        nextPayment={nextPayment}
      />
      <div className="grid p-4 md:grid-cols-3 grid-cols-1 gap-4">
        <DataTable consolidateData={consolidateData} />
        <BarChart />
      </div>
    </main>
  );
}
