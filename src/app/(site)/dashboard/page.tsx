"use client";
import BarChart from "@/components/BarChart";
import DataTable from "@/components/DataTable";
import TopCard from "@/components/TopCard";
import next from "next/types";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://msrsoftware.com.br/node-api/userdata",
          { cache: "force-cache", next: { revalidate: 10 } }
        );
        const data = await response.json();
        setData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

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
