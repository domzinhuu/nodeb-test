import { ConsolidateData } from "@/app/context/DashboardContext";
import { data } from "autoprefixer";
import { groupBy, sumBy } from "lodash";

const dateFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: "GMT" });
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function mapAcquirerToNameAndValue(acquirers: any[]) {
  return acquirers.map((el: any) => ({
    document: el.document,
    name: el.name,
    valorTotal: el.valorTotal,
  }));
}

export const consolidateDataReduceToAcquirersArray = (
  consolidate: ConsolidateData[]
) => {
  if (!consolidate || consolidate.length === 0) {
    return [];
  }

  if (consolidate.length === 1) {
    return mapAcquirerToNameAndValue(consolidate[0].acquirers);
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
): Array<any> => {
  const acquirers = consolidateDataReduceToAcquirersArray(consolidate);
  const grouped: any = groupBy(acquirers, "document");

  return Object.keys(grouped).map((key) => ({
    document: key,
    name: grouped[key][0].name,
  }));
};

export const consolidateDataReduceToBrandsArray = (
  consolidate: ConsolidateData[]
) => {
  if (!consolidate || consolidate.length === 0) {
    return [];
  }

  if (consolidate.length === 1) {
    const acquirers = consolidate[0].acquirers;

    if (acquirers.length === 1) {
      return acquirers[0].bandeiras;
    }

    let brandData = acquirers.reduce((accBrand: any, currentBrand: any) => {
      let newData = accBrand.bandeiras ? accBrand.bandeiras : accBrand;

      newData = [...newData, ...currentBrand.bandeiras];
      return newData;
    });

    return brandData;
  }

  return consolidate.reduce((acc: any, current: any) => {
    let brandData = current.acquirers.reduce(
      (accBrand: any, currentBrand: any) => {
        let newData = accBrand.bandeiras ? accBrand.bandeiras : accBrand;

        newData = [...newData, ...currentBrand.bandeiras];
        return newData;
      }
    );

    let newReduceValue = brandData.bandeiras
      ? brandData.bandeiras
      : [...brandData];
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

export const formatDate = (date: string): string => {
  if (date && !Number.isNaN(new Date(date).getTime())) {
    const jsDate = new Date(date);
    return dateFormat.format(jsDate);
  }

  return "";
};

export const maskToCnpj = (value: string = ""): string => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskToCpf = (value: string = ""): string => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskDocument = (value: string = ""): string => {
  if (value.replace(/\D/g, "").length <= 11) {
    return maskToCpf(value);
  }

  return maskToCnpj(value);
};

export const maskToPhone = (value: string = ""): string => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const maskToCellhone = (value: string = ""): string => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const formatToDocument = (value: string = ""): string => {
  if (value.replace(/\D/g, "").length <= 11) {
    return maskToCpf(value);
  }

  return maskToCnpj(value);
};

export const formatToPhone = (value: string = ""): string => {
  value = value.replace(/\D/g, "");

  if (value.length > 10) {
    return maskToCellhone(value);
  }

  return maskToPhone(value);
};

export const formatToCurrency = (value: number): string => {
  return formatter.format(value);
};

export const formatToCep = (value: string = ""): string => {
  return value
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const matchEmailPattern = (v: string = "") => {
  return (
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    "Informe um email válido."
  );
};

export const matchPhonePattern = (v: string = "") => {
  return (
    /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/.test(
      v
    ) || "Informe um telefone válido."
  );
};

export const validateCpf = (v: string = "") => {
  if (typeof v !== "string") {
    return false;
  }

  v = v.replace(/[^\d]+/g, "");

  if (v.length !== 11 || !!v.match(/(\d)\1{10}/)) {
    return false;
  }

  const values = v.split("").map((el) => +el);
  const rest = (count: any) =>
    ((values
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  return (
    (rest(10) === values[9] && rest(11) === values[10]) ||
    "O documento informado não é válido"
  );
};

export function buildResponseData(mockData: any) {
  const consolidate = mockData.organizations.map((org: any) => {
    const acquirers = org.acquirers.map((acquirer: any) => {
      acquirer.valorPagar = sumBy(acquirer.bandeiras, "blockedAmount");
      acquirer.valorReceber = sumBy(acquirer.bandeiras, "freeAmount");
      acquirer.valorTotal = acquirer.valorReceber + acquirer.valorPagar;
      return acquirer;
    });
    const totalPayValue = sumBy(acquirers, "valorPagar");
    const totalReceiveValue = sumBy(acquirers, "valorReceber");
    const totalValue = sumBy(acquirers, "valorTotal");

    return {
      document: org.document,
      name: org.name,
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
    { border: "rgb(102, 57, 141)", bgColor: "rgb(102, 57, 141, 0.8)" },
    { border: "rgb(133, 97, 164)", bgColor: "rgb(133, 97, 164, 0.8)" },
    { border: "rgb(147, 214, 215)", bgColor: "rgb(147, 214, 215, 0.8)" },
    { border: "rgb(45, 112, 113)", bgColor: "rgb(45, 112, 113, 0.8)" },
    { border: "rgb(82, 46, 113)", bgColor: "rgb(82, 46, 113, 0.8)" },
    { border: "rgb(163, 136, 187)", bgColor: "rgb(163, 136, 187, 0.8)" },
    { border: "rgb(61, 34, 85)", bgColor: "rgb(61, 34, 85, 0.8)" },
    { border: "rgb(75, 186, 188)", bgColor: "rgb(75, 186, 188, 0.8)" },
    { border: "rgb(111, 200, 201)", bgColor: "rgb(111, 200, 201, 0.8)" },
    { border: "rgb(60, 149, 150)", bgColor: "rgb(60, 149, 150, 0.8)" },
    { border: "rgb(183, 227, 228)", bgColor: "rgb(183, 227, 228, 0.8)" },
    { border: "rgb(30, 74, 75, 113)", bgColor: "rgb(30, 74, 75, 0.8)" },
  ];
}
