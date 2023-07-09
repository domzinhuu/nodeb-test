import { ConsolidateData } from "@/app/context/DashboardContext";
import { groupBy, sumBy } from "lodash";

const dateFormat = new Intl.DateTimeFormat("pt-BR");
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function mapAcquirerToNameAndValue(acquirers: any[]) {
  return acquirers.map((el: any) => ({
    document: el.document,
    valorTotal: el.valorTotal,
  }));
}

export const consolidateDataReduceToAcquirersArray = (
  consolidate: ConsolidateData[]
) => {
  if (!consolidate || consolidate.length === 0) {
    return [];
  }

  return consolidate.reduce((acc: any, current: any) => {
    const acqData = mapAcquirerToNameAndValue(current.acquirers);

    let newReduceValue = acc.acquirers
      ? mapAcquirerToNameAndValue(acc.acquirers)
      : acc;

    newReduceValue = [...newReduceValue, ...acqData];
    return newReduceValue;
  });
};

export const getAllAcquirerNameFromConsolidateData = (
  consolidate: ConsolidateData[]
): Array<string> => {
  const acquirers = consolidateDataReduceToAcquirersArray(consolidate);
  const grouped = groupBy(acquirers, "document");

  return Object.keys(grouped);
};

export const consolidateDataReduceToBrandsArray = (
  consolidate: ConsolidateData[]
) => {
  if (!consolidate || consolidate.length === 0) {
    return [];
  }

  return consolidate.reduce((acc: any, current: any) => {
    let brandData = current.acquirers.reduce(
      (accBrand: any, currentBrand: any) => {
        let newData = accBrand.bandeiras ? accBrand.bandeiras : accBrand;
        newData = [...newData, ...currentBrand.bandeiras];
        return newData;
      }
    );

    let newReduceValue = brandData.bandeiras ? brandData.bandeiras : [...brandData];
    return newReduceValue;
  });
};

export const getAllBrandNameFromConsolidateData = (
  consolidate: ConsolidateData[]
): Array<string> => {
  const brands = consolidateDataReduceToBrandsArray(consolidate);
  const grouped = groupBy(brands, "name");

  return Object.keys(grouped);
};

export const formatDate = (date: Date): string => {
  if (date) {
    return dateFormat.format(date);
  }

  return "";
};

export const formatToCurrency = (value: number): string =>
  formatter.format(value);

export function buildResponseData(mockData: any) {
  const consolidate = mockData.organizations.map((org: any) => {
    const acquirers = org.acquirers.map((acquirer: any) => {
      acquirer.valorPagar = sumBy(acquirer.bandeiras, "valorPagar");
      acquirer.valorReceber = sumBy(acquirer.bandeiras, "valorReceber");
      acquirer.valorTotal = acquirer.valorReceber + acquirer.valorPagar;
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
