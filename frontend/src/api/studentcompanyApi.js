import axios from "axios";

const API_URL =
<<<<<<< HEAD
  "http://localhost:8080/api/companies";
=======
  "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/companies";
>>>>>>> origin/feature/backend

export const getCompanies = () => {
  return axios.get(API_URL);
};