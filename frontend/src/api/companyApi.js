import axios from "axios";

const API_URL = "http://localhost:8080/api/companies";

export const getCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const deleteCompany = async (id) => {
  const response = await axios.delete(
    `http://localhost:8080/api/companies/delete/${id}`
  );

  return response.data;
};
export const updateCompany = async (
  id,
  companyData
) => {
  const response = await axios.put(
    `http://localhost:8080/api/companies/update/${id}`,
    companyData
  );

  return response.data;
};
export const addCompany = async (companyData) => {
  const response = await axios.post(
    "http://localhost:8080/api/companies",
    companyData
  );

  return response.data;
};