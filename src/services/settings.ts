import { api } from "@/lib/axios";

async function getSettings(): Promise<string> {
  const result = await api.get("/settings");
  const { _id, __v, ...otherParams } = result.data; // removendo o _id e a versão pois não preciso, checkar para tirar isso na api
  const jsonStringify = JSON.stringify(otherParams);

  return jsonStringify;
}

async function postSetting(json: string): Promise<void> {
  return api.post("/userdata", json);
}

export const SettingService = {
  getSettings,
  postSetting,
};
