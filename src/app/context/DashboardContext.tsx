"use client";

import { DashboardDataFilter, DashboardService } from "@/services/dashboard";
import { buildResponseData } from "@/utils/helper.functions";
import React, { ReactNode, useEffect, useState } from "react";

interface DashboardContextData {
  data: any;
  consolidateData: ConsolidateData[];
  isLoading: boolean;
  fetchDashboardData: (filter?: DashboardDataFilter) => Promise<void>;
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

  async function getDashboardData(filter?: DashboardDataFilter) {
    setIsLoading(true);
    const response = await DashboardService.fetchDashboardData(filter);
    const consolidateData = buildResponseData(response);
    setData(response);
    setConsolidate(consolidateData);
    setIsLoading(false);
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        data,
        consolidateData: consolidate,
        isLoading,
        fetchDashboardData: getDashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
