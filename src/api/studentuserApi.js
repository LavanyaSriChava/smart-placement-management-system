import axios from "axios";

const API_URL =
   "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/users";

export const getUserById = async (id) => {
  return axios.get(
    `${API_URL}/${id}`
  );
};

export const updateUser = async (
  id,
  userData
) => {
  return axios.put(
    `${API_URL}/update/${id}`,
    userData
  );
};