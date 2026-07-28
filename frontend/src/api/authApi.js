import axios from "axios";

const AUTH_BASE_URL =
  "https://ovary-armless-distill.ngrok-free.dev/api/auth";

export const loginUser = (loginData) => {
  return axios.post(
    `${AUTH_BASE_URL}/login`,
    loginData
  );
};

export const registerUser = (userData) => {
  return axios.post(
    `${AUTH_BASE_URL}/register`,
    userData
  );
};