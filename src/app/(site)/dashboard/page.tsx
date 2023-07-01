"use client";
import {
  ConsolidateData,
  DashboardContext,
} from "@/app/context/DashboardContext";
import BarChart from "@/components/BarChart";
import DataTable from "@/components/DataTable";
import { DoughnutChart } from "@/components/DoughnutChart";
import TopCard from "@/components/TopCard";
import { Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { values, groupBy, sumBy } from "lodash";
import { getChartColors } from "@/utils/helper.functions";

function getChartDataByAcquirer(consolidateData: ConsolidateData[] = []) {
  const colorChart = getChartColors();
  let acquirerList: any = []; // armazena todos os acquirers de uma lista de comercio

  if (consolidateData.length > 0) {
    acquirerList = consolidateData.reduce((acc: any, current: any) => {
      const acqData = current.acquirers.map((el: any) => ({
        document: el.document,
        valorTotal: el.valorTotal,
      }));

      let newReduceValue = acc.acquirers
        ? acc.acquirers.map((el: any) => ({
            document: el.document,
            valorTotal: el.valorTotal,
          }))
        : acc;
      newReduceValue = [...newReduceValue, ...acqData];
      return newReduceValue;
    });
  }

  // agrupa os acquirer por documento para não ter repetidos na lista
  const groupByAqcquirer = values(groupBy(acquirerList, "document"));

  // soma o valorTotal de cada acquirer agrupado no groupByAcquirer
  let sumAcqurierTotal = groupByAqcquirer.map((acq: any) => {
    return { document: acq[0].document, totalValue: sumBy(acq, "valorTotal") };
  });

  // monta o dataset para enviar ao chart setando cores dinamicamente
  let acqData = {
    labels: sumAcqurierTotal.map((item) => item.document),
    datasets: [
      {
        label: "# valor total",
        data: sumAcqurierTotal.map((item) => item.totalValue),
        backgroundColor: sumAcqurierTotal.map(
          (item, index) => colorChart[index].bgColor
        ),
        borderColor: sumAcqurierTotal.map(
          (item, index) => colorChart[index].bgColor
        ),
        borderWidth: 1,
      },
    ],
  };

  return acqData;
}

export default function Dashboard() {
  const { consolidateData, data } = useContext(DashboardContext);
  const acquirerData = useMemo(
    () => getChartDataByAcquirer(consolidateData),
    [consolidateData]
  );

  const paymentMethodData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const valueData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
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

          <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] flex flex-col gap-4 p-8 justify-start items-center border rounded-lg bg-white box-border overflow-y-scroll">
            <div className="w-full">
              <Typography
                variant="h6"
                className="p-2 rounded-lg bg-slate-100 flex justify-center"
              >
                Credenciadoras
              </Typography>
              <DoughnutChart data={acquirerData} />
            </div>
            <div className="w-full">
              <Typography
                variant="h6"
                className="p-2 rounded-lg bg-slate-100 flex justify-center"
              >
                Bandeiras
              </Typography>
              <DoughnutChart data={paymentMethodData} />
            </div>
            <div className="w-full">
              <Typography
                variant="h6"
                className="p-2 rounded-lg bg-slate-100 flex justify-center"
              >
                Valor (Comprometido / Livre)
              </Typography>
              <DoughnutChart data={valueData} />
            </div>
          </div>
        </div>
      </>
    )
  );
}
