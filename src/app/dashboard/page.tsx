import BarChart from "@/components/BarChart";
import DataTable from "@/components/DataTable";
import Header from "@/components/Header";
import TopCard from "@/components/TopCard";
import { buildResponseData } from "@/utils/helper.functions";
import { filter } from "lodash";
import { use } from "react";

async function getDashboardDataReq() {
  const response = await fetch("http://localhost:3000/api/settings", {
    cache:"no-cache",
  });
  const json = await response.json();
  const mockData  = JSON.parse(json)
  const data = buildResponseData(mockData);
  const consolidateData = filter(data, (item: any) => item);

  return {
    futureSchedule: mockData.agendaFutura,
    consolidateData,
    lastPayment: mockData.ultimoPagamento,
    nextPayment: mockData.proximo,
  };
}

export default function Dashboard() {
  const { consolidateData, futureSchedule, lastPayment, nextPayment } = use(
    getDashboardDataReq()
  );

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
