"use client";
import {
  ConsolidateData,
  DashboardContext,
} from "@/app/context/DashboardContext";
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
          (item, index) => colorChart[index].border
        ),
        borderWidth: 1,
      },
    ],
  };

  return acqData;
}

function getChartDataByPaymentMethod(consolidateData: ConsolidateData[] = []) {
  const colorChart = getChartColors();
  let brandList: any = []; // armazena todos as bandeiras de uma lista de comercio

  if (consolidateData.length > 0) {
    brandList = consolidateData.reduce((acc: any, current: any) => {
      let brandData = current.acquirers.reduce(
        (accBrand: any, currentBrand: any) => {
          let newData = accBrand.bandeiras ? accBrand.bandeiras : accBrand;
          newData = [...newData, ...currentBrand.bandeiras];
          return newData;
        }
      );

      let newReduceValue = acc.acquirers ? brandData : [...acc, ...brandData];
      return newReduceValue;
    });
  }

  // agrupa as bandeiras por documento para não ter repetidos na lista
  const groupByBrand = values(groupBy(brandList, "name"));

  // soma o valor de cada bandeira agrupada no groupByBrand
  let sumBrandTotal = groupByBrand.map((brand: any) => {
    return { name: brand[0].name, value: sumBy(brand, "value") };
  });

  // monta o dataset para enviar ao chart setando cores dinamicamente
  let brandDataSet = {
    labels: sumBrandTotal.map((item) => item.name),
    datasets: [
      {
        label: "# valor total",
        data: sumBrandTotal.map((item) => item.value),
        backgroundColor: sumBrandTotal.map(
          (item, index) => colorChart[index]?.bgColor
        ),
        borderColor: sumBrandTotal.map(
          (item, index) => colorChart[index]?.border
        ),
        borderWidth: 1,
      },
    ],
  };

  return brandDataSet;
}

function getChartDataByValue(consolidateData: ConsolidateData[] = []) {
  const colorChart = getChartColors();

  if (consolidateData.length > 0) {
    const sumValueToPay = sumBy(consolidateData, "totalPayValue");
    const sumValueToReceive = sumBy(consolidateData, "totalReceiveValue");

    let orgData: any = {
      labels: ["Valor a Receber", "Valor Comprometido"],
      datasets: [
        {
          label: "# valor",
          data: [sumValueToReceive, sumValueToPay],
          backgroundColor: [colorChart[6].bgColor, colorChart[3].bgColor],
          borderColor: [colorChart[6].border, colorChart[3].border],
          borderWidth: 1,
        },
      ],
    };

    return orgData;
  }

  return {};
}

export default function Dashboard() {
  const { consolidateData, data } = useContext(DashboardContext);
  const acquirerData = useMemo(
    () => getChartDataByAcquirer(consolidateData),
    [consolidateData]
  );

  const paymentMethodData = useMemo(
    () => getChartDataByPaymentMethod(consolidateData),
    [consolidateData]
  );

  const valueData = getChartDataByValue(consolidateData);

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
          {consolidateData.length && (
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
          )}
        </div>
      </>
    )
  );
}
