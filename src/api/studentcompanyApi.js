import axios from "axios";

const API_URL =
  "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/companies";

export const getCompanies = () => {
  return axios.get(API_URL);
};