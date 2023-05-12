import { sumBy } from "lodash";

const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatToCurrency = (value: number) => formatter.format(value);

export function convertAcquirersToAlist(acquirers: any) {
  return Object.keys(acquirers).map((key) => {
    return {
      acquirer: key,
      ultimoPagamento: acquirers[key].ultimoPagamento,
      valorPagar: Number(acquirers[key].valorPagar),
      valorReceber: Number(acquirers[key].valorReceber),
      valorTotal: Number(acquirers[key].valorTotal),
    };
  });
}

export function buildResponseData(mockData: any) {
  return Object.keys(mockData).map((key) => {
    if (key.replace(/\D/g, "") === "") {
      return null;
    }
    const acquirers = mockData[key].acquirers;
    const acquirerToList = convertAcquirersToAlist(acquirers);

    const totalPayValue = sumBy(acquirerToList, "valorPagar");
    const totalReceiveValue = sumBy(acquirerToList, "valorReceber");
    const totalValue = sumBy(acquirerToList, "valorTotal");

    return {
      document: key,
      totalPayValue,
      totalReceiveValue,
      totalValue,
      acquirers: acquirerToList,
    };
  });
}
