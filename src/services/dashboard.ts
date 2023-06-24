import { api } from "@/lib/axios";
import { DashboardData } from "@/models/dashboard";

async function fetchDashboardData(): Promise<DashboardData> {
  const response = await api.get("/userdata");
  return response.data[0];
}

export const DashboardService = {
  fetchDashboardData,
};
