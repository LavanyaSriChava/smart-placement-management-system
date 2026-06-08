import api from "../services/api";

export const getCompanies = async () => {
  const response = await api.get("/api/companies");
  return response.data;
};