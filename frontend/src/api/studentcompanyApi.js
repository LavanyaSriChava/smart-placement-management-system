import axios from "axios";

const API_URL =
  "http://localhost:8080/api/companies";

export const getCompanies = () => {
  return axios.get(API_URL);
};