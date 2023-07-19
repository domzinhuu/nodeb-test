import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.nodeb.com.br",
});

export const helperApi = axios.create({
  baseURL: "https://brasilapi.com.br/api",
});
