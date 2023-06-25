import { api } from "@/lib/axios";
import { DashboardData } from "@/models/dashboard";

async function fetchDashboardData(): Promise<DashboardData> {
  const response = await api.get("/empresas");
  return response.data;
}

export const DashboardService = {
  fetchDashboardData,
};
