"use client";

import { DashboardDataFilter, DashboardService } from "@/services/dashboard";
import {
  buildResponseData,
  getAllAcquirerNameFromConsolidateData,
  getAllBrandNameFromConsolidateData,
} from "@/utils/helper.functions";
import { sumBy } from "lodash";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

interface DashboardContextData {
  data: any;
  consolidateData: ConsolidateData[];
  chartConsolidate: ConsolidateData[];
  isLoading: boolean;
  acquirersName: Array<string>;
  brandsName: Array<string>;
  fetchDashboardData: (filter?: DashboardDataFilter) => Promise<void>;
  filterChartData: (filter: ChartFilters) => any;
}

export const DashboardContext = React.createContext({} as DashboardContextData);

interface DashboardContextProviderProps {
  children: ReactNode;
}

interface Acquirers {
  document: string;
  ultimoPagamento: string;
  valorPagar: number;
  valorReceber: number;
  valorTotal: number;
  bandeiras: { name: string; value: number }[];
}

interface ChartFilters {
  acquirers: string[];
  brands: string[];
}

export interface ConsolidateData {
  document: string;
  totalPayValue: number;
  totalReceiveValue: number;
  totalValue: number;
  acquirers: Acquirers[];
}

export function DashboardContextProvider({
  children,
}: DashboardContextProviderProps) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [consolidate, setConsolidate] = useState<ConsolidateData[]>([]);
  const [chartConsolidate, setChartConsolidate] = useState<ConsolidateData[]>(
    []
  );

  const allAcquirersName = useMemo(() => {
    return getAllAcquirerNameFromConsolidateData(consolidate);
  }, [consolidate]);

  const allBrandsName = useMemo(() => {
    return getAllBrandNameFromConsolidateData(consolidate);
  }, [consolidate]);

  async function getDashboardData(filter?: DashboardDataFilter) {
    setIsLoading(true);
    const response = await DashboardService.fetchDashboardData(filter);
    const consolidateData = buildResponseData(response);
    setData(response);
    setConsolidate(consolidateData);
    setChartConsolidate(consolidateData)
    setIsLoading(false);
  }

  function filterChartData(filter: ChartFilters) {
    let consolidateFilteredByAcquirers = consolidate;

    if (filter.acquirers.length) {
      consolidateFilteredByAcquirers = consolidateFilteredByAcquirers.map(
        (org: ConsolidateData): ConsolidateData => {
          const filterAcquirers = org.acquirers.filter((acq) =>
            filter.acquirers.includes(acq.document)
          );
          return {
            acquirers: filterAcquirers,
            document: org.document,
            totalPayValue: sumBy(filterAcquirers, "valorPagar"),
            totalReceiveValue: sumBy(filterAcquirers, "valorReceber"),
            totalValue: sumBy(filterAcquirers, "valorTotal"),
          };
        }
      );
    }

    if (filter.brands.length) {
      consolidateFilteredByAcquirers = chartConsolidate.map(
        (org: ConsolidateData): ConsolidateData => {
          const filterAcquirers = org.acquirers.map((acq): Acquirers => {
            const filteredBrands = acq.bandeiras.filter((brand: any) =>
              filter.brands.includes(brand.name)
            );
            const valorPagar = sumBy(filteredBrands, "valorPagar");
            const valorReceber = sumBy(filteredBrands, "valorReceber");
            return {
              bandeiras: filteredBrands,
              document: acq.document,
              ultimoPagamento: acq.ultimoPagamento,
              valorPagar,
              valorReceber,
              valorTotal: valorReceber - valorPagar,
            };
          });
          return {
            acquirers: filterAcquirers,
            document: org.document,
            totalPayValue: sumBy(filterAcquirers, "valorPagar"),
            totalReceiveValue: sumBy(filterAcquirers, "valorReceber"),
            totalValue: sumBy(filterAcquirers, "valorTotal"),
          };
        }
      );
    }

    setChartConsolidate(consolidateFilteredByAcquirers);
  }

  useEffect(() => {
    setChartConsolidate(consolidate);
  }, [consolidate]);

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        data,
        consolidateData: consolidate,
        chartConsolidate,
        acquirersName: allAcquirersName,
        brandsName: allBrandsName,
        isLoading,
        fetchDashboardData: getDashboardData,
        filterChartData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
