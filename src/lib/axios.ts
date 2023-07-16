import axios from "axios";

export const api = axios.create({
  baseURL: "https://nodeb.com.br:3050",
});

export const helperApi = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});
