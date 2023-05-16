"use client";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarchartProps {
  data: any;
}

const colorList: any[] = [
  { border: "rgb(81, 18, 133)", bgColor: "rgb(81, 18, 133, 0.8)" },
  { border: "rgb(176, 14, 221)", bgColor: "rgb(176, 14, 221, 0.8)" },
  { border: "rgb(220, 12, 209)", bgColor: "rgb(220, 12, 209, 0.8)" },
  { border: "rgb(142, 2, 98)", bgColor: "rgb(142, 2, 98, 0.8)" },
  { border: "rgb(96, 21, 226)", bgColor: "rgb(96, 21, 226, 0.8)" },
  { border: "rgb(24, 39, 208)", bgColor: "rgb(24, 39, 208, 0.8)" },
  { border: "rgb(107, 33, 168)", bgColor: "rgb(107, 33, 168, 0.8)" },
];

function BarChart({ data }: BarchartProps) {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    setChartData({
      labels: ["Período atual"],
      datasets: data.consolidateData?.map((info: any, index: number) => {
        const color =
          colorList.length > index ? colorList[index] : colorList[0];

        return {
          label: [info.document],
          data: [info.totalReceiveValue],
          borderColor: color.border,
          backgroundColor: color.bgColor,
        };
      }),
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Valor a receber (por comércio)",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, []);
  return (
    <>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white  overflow-y-scroll">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
}

export default BarChart;
