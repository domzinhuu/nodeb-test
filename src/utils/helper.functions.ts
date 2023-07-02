import { sumBy } from "lodash";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatToCurrency = (value: number) => formatter.format(value);

export function buildResponseData(mockData: any) {
  const consolidate = mockData.organizations.map((org: any) => {
    const acquirers = org.acquirers.map((acquirer: any) => {
      acquirer.valorPagar = Number(acquirer.valorPagar);
      acquirer.valorReceber = Number(acquirer.valorReceber);
      acquirer.valorTotal = Number(acquirer.valorTotal);
      return acquirer;
    });
    const totalPayValue = sumBy(acquirers, "valorPagar");
    const totalReceiveValue = sumBy(acquirers, "valorReceber");
    const totalValue = sumBy(acquirers, "valorTotal");

    return {
      document: org.document,
      totalPayValue,
      totalReceiveValue,
      totalValue,
      acquirers: org.acquirers,
    };
  });

  return consolidate;
}

export function getChartColors() {
  return [
    { border: "rgb(81, 18, 133)", bgColor: "rgb(81, 18, 133, 0.8)" },
    { border: "rgb(176, 14, 221)", bgColor: "rgb(176, 14, 221, 0.8)" },
    { border: "rgb(220, 12, 209)", bgColor: "rgb(220, 12, 209, 0.8)" },
    { border: "rgb(142, 2, 98)", bgColor: "rgb(142, 2, 98, 0.8)" },
    { border: "rgb(96, 21, 226)", bgColor: "rgb(96, 21, 226, 0.8)" },
    { border: "rgb(107, 33, 168)", bgColor: "rgb(107, 33, 168, 0.8)" },
    { border: "rgb(153, 102, 255)", bgColor: "rgb(153, 102, 255, 0.8)" },
    { border: "rgb(122, 82, 204)", bgColor: "rgb(122, 82, 204, 0.8)" },
    { border: "rgb(92, 61, 153)", bgColor: "rgb(92, 61, 153, 0.8)" },
    { border: "rgb(61, 41, 102)", bgColor: "rgb(61, 41, 102, 0.8)" },
    { border: "rgb(31, 20, 51)", bgColor: "rgb(31, 20, 51, 0.8)" },
  ];
}
