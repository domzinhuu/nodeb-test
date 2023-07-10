import axios from "axios";

export const api = axios.create({
  baseURL: "https://nodeb.com.br:3050",
});
