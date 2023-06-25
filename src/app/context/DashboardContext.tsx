"use client";

import { DashboardService } from "@/services/dashboard";
import { buildResponseData } from "@/utils/helper.functions";
import React, { ReactNode, useEffect, useState } from "react";

interface DashboardContextData {
  data: any;
  consolidateData: ConsolidateData[];
}

export const DashboardContext = React.createContext({} as DashboardContextData);

interface DashboardContextProviderProps {
  children: ReactNode;
}

interface Acquirers {
  acquirer: string;
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
  const [consolidate, setConsolidate] = useState<ConsolidateData[]>([]);

  async function getDashboardData() {
    const response = await DashboardService.fetchDashboardData();
    const consolidateData = buildResponseData(response);

    setData(response);
    setConsolidate(consolidateData);
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardContext.Provider value={{ data, consolidateData: consolidate }}>
      {children}
    </DashboardContext.Provider>
  );
}
