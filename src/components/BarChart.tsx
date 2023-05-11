'use client'
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

function BarChart() {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<any>({});

  useEffect(() => {
    setChartData({
      labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
      datasets: [
        {
          label: "Talvez por adquirente?",
          data: [1283, 4890, 1820, 5849, 6970, 6890, 7958],
          borderColor: "rgb(53,162,235)",
          backgroundColor: "rgb(53,162,235,0.4)",
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Integra Grafico",
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
