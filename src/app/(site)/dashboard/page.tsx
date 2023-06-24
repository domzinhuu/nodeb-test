"use client";
import BarChart from "@/components/BarChart";
import DataTable from "@/components/DataTable";
import TopCard from "@/components/TopCard";
import { DashboardService } from "@/services/dashboard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>({});
  async function fetchData() {
    const response = await DashboardService.fetchDashboardData();
    setData(response);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    data && (
      <>
        <TopCard
          futureSchedule={Number(data.agendaFutura)}
          lastPayment={data.ultimoPagamento}
          nextPayment={data.proximo?.date}
        />
        <div className="grid p-4 md:grid-cols-3 grid-cols-1 gap-4">
          <DataTable data={data} />
          <BarChart data={data} />
        </div>
      </>
    )
  );
}
