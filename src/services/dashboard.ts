import { SESSION_TOKEN, USER_SESSION } from "@/constants/variables";
import { api } from "@/lib/axios";
import { DashboardData } from "@/models/dashboard";

export interface DashboardDataFilter {
  dataInicio: string;
  dataFim: string;
}

async function fetchDashboardData(
  filter?: DashboardDataFilter
): Promise<DashboardData | null> {
  let token = sessionStorage.getItem(SESSION_TOKEN);
  let url: string = "/resume";

  if (!token) {
    sessionStorage.clear();
    return null;
  }

  if (filter) {
    url += `?dataInicio=${filter.dataInicio}&dataFim=${filter.dataFim}`;
  }
  const response = await api.get(url, { headers: { Authorization: token } });
  return response.data;
}

export const DashboardService = {
  fetchDashboardData,
};
