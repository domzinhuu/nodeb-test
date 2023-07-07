import React, { useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LegendItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from "react-chartjs-2";
import { sum, sumBy } from "lodash";
import { Legend as PluginLegend } from "chart.js/dist/plugins/plugin.legend";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface DoughnutDataset {
  type?: any;
  label: string;
  borderColor: Array<string>;
  backgroundColor: Array<string>;
  borderWidth: number;
  fill?: boolean;
  data: number[];
}

interface DoughnutData {
  labels: Array<string>;
  datasets: Array<DoughnutDataset>;
}

interface DoughnutChartProps {
  data: any;
  onLegendClick: (
    evt: any,
    legendItem: LegendItem,
    legend: PluginLegend
  ) => void;
}

export function DoughnutChart({
  data = {} as DoughnutData,
  onLegendClick,
}: DoughnutChartProps) {
  return (
    <Doughnut
      style={{ width: "width:100%", height: "100%" }}
      options={{
        responsive: true,
        plugins: {
          datalabels: {
            color: "#fff",
            formatter: (value, context) => {
              const dataArray = context.dataset.data;
              const dataTotal = sum(dataArray);

              return ((value * 100) / dataTotal).toPrecision(2) + "%";
            },
          },
          /* legend: {
            onClick: onLegendClick,
          }, */
        },
      }}
      data={data}
    />
  );
}
