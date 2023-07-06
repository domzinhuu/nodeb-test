import { USER_SESSION } from "@/constants/variables";
import { api } from "@/lib/axios";
import { DashboardData } from "@/models/dashboard";

export interface DashboardDataFilter {
  dataInicio: string;
  dataFim: string;
}

async function fetchDashboardData(
  filter?: DashboardDataFilter
): Promise<DashboardData> {
  let data = sessionStorage.getItem(USER_SESSION);
  let loggedUser: any = {};
  let url: string = "/userdata";
  if (data) {
    loggedUser = JSON.parse(data);
  }

  if (filter) {
    url += `?dataInicio=${filter.dataInicio}&dataFim=${filter.dataFim}`;
  }
  const response = await api.get(url);
  return response.data;
}

export const DashboardService = {
  fetchDashboardData,
};
