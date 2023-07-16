import { helperApi } from "@/lib/axios";
import { formatToCep, formatToPhone } from "@/utils/helper.functions";

interface Cep {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

export interface CompanyData {
  cnpj: string;
  cep: string;
  state: string;
  city: string;
  info: string;
  neighborhood: string;
  street: string;
  name: string;
  phone: string;
}

async function getCepData(cep: string): Promise<Cep | null> {
  try {
    cep = cep.replace(/\D/g, "");
    const response = await helperApi.get("/cep/v2/" + cep);
    return response.data;
  } catch (error) {
    return null;
  }
}

async function getCnpjData(cnpj: string): Promise<CompanyData | null> {
  try {
    cnpj = cnpj.replace(/\D/g, "");
    const { data } = await helperApi.get("/cnpj/v1/" + cnpj);
    return {
      cep: formatToCep(data.cep),
      city: data.municipio,
      cnpj: data.cnpj,
      name: data.nome_fantasia,
      neighborhood: data.bairro,
      phone: formatToPhone(data.ddd_telefone_1),
      info: data.complemento,
      state: data.uf,
      street: `${data.descricao_tipo_de_logradouro} ${data.logradouro}`,
    };
  } catch (error) {
    return null;
  }
}

export const HelperService = {
  getCepData,
  getCnpjData,
};
