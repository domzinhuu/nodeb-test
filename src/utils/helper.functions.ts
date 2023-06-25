import { ConsolidateData } from "@/app/context/DashboardContext";
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
