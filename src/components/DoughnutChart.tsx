import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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
}

export function DoughnutChart({
  data = {} as DoughnutData,
}: DoughnutChartProps) {
  return (
    <Doughnut
      style={{ width: "width:100%", height: "100%" }}
      options={{
        responsive: true,
      }}
      data={data}
    />
  );
}
