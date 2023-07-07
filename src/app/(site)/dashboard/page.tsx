"use client";
import {
  ConsolidateData,
  DashboardContext,
} from "@/app/context/DashboardContext";
import DataTable from "@/components/DataTable";
import { DoughnutChart } from "@/components/DoughnutChart";
import TopCard from "@/components/TopCard";
import { Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { values, groupBy, sumBy } from "lodash";
import { getChartColors } from "@/utils/helper.functions";
import { FilterDialog } from "@/components/FilterDialog";
import { LegendItem } from "chart.js";
import { Legend } from "chart.js/dist/plugins/plugin.legend";
import { Funnel } from "phosphor-react";
import { FilterChartDialog } from "@/components/FilterChartDialog";

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
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filterChartDialogOpen, setFilterChartDialogOpen] = useState(false);

  const acquirerData = useMemo(
    () => getChartDataByAcquirer(consolidateData),
    [consolidateData]
  );

  const paymentMethodData = useMemo(
    () => getChartDataByPaymentMethod(consolidateData),
    [consolidateData]
  );

  const valueData = getChartDataByValue(consolidateData);

  function handleToggleFilterDialog() {
    setFilterDialogOpen((prev) => !prev);
  }

  function handleToggleFilterChartDialog() {
    setFilterChartDialogOpen((prev) => !prev);
  }

  function handleClickChartLegend(
    evn: any,
    legendItem: LegendItem,
    legend: Legend
  ) {
    console.log(legendItem.index);
  }

  return (
    data && (
      <>
        <TopCard
          futureSchedule={Number(data.agendaFutura)}
          lastPayment={data.ultimoPagamento}
          nextPayment={data.proximo?.date}
        />
        <div className="grid p-4 md:grid-cols-3 grid-cols-1 gap-4 ">
          <DataTable
            data={data}
            showFilterButton={true}
            onFilterOpen={handleToggleFilterDialog}
          />
          <div className="col-span-1 bg-white rounded-lg">
            <div className="flex items-center justify-between py-2 px-4 bg-slate-50  rounded-lg border-b border-b-slate-100 rounded-b-none">
              <Typography variant="h6" className="font-bold">
                Gráficos
              </Typography>
              <button
                title="Abrir filtros"
                className="text-sm underline flex gap-2 items-center hover:bg-white font-bold rounded-lg p-2 transition-all duration-100"
                onClick={handleToggleFilterChartDialog}
              >
                <Funnel size={20} />
              </button>
            </div>
            {consolidateData.length && (
              <div className="chart-slider">
                <div className="slides w-full relative lg:h-[65vh] h-[50vh] flex flex-col gap-4 p-8 border-0 justify-start items-center rounded-lg bg-white box-border overflow-y-scroll">
                  <div className="w-full chart-slide py-4">
                    <Typography
                      variant="h6"
                      className="p-2 rounded-lg bg-slate-100 flex justify-center"
                    >
                      Credenciadoras
                    </Typography>
                    <DoughnutChart
                      onLegendClick={handleClickChartLegend}
                      data={acquirerData}
                    />
                  </div>
                  <div className="w-full chart-slide py-4">
                    <Typography
                      variant="h6"
                      className="p-2 rounded-lg bg-slate-50 flex justify-center"
                    >
                      Bandeiras
                    </Typography>
                    <DoughnutChart
                      onLegendClick={handleClickChartLegend}
                      data={paymentMethodData}
                    />
                  </div>
                  <div className="w-full chart-slide py-4">
                    <Typography
                      variant="h6"
                      className="p-2 rounded-lg bg-slate-100 flex justify-center"
                    >
                      Valor (Comprometido / Livre)
                    </Typography>
                    <DoughnutChart
                      onLegendClick={handleClickChartLegend}
                      data={valueData}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <FilterDialog
          isOpen={filterDialogOpen}
          onClose={handleToggleFilterDialog}
        />

        <FilterChartDialog
          isOpen={filterChartDialogOpen}
          onClose={handleToggleFilterChartDialog}
        />
      </>
    )
  );
}
