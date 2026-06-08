import api from "../services/api";

export const getApplications = async () => {
  const response = await api.get("/api/applications");
  return response.data;
};