import axios from "axios";

const API_URL =
<<<<<<< HEAD
  "http://localhost:8080/api/users";
=======
   "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/users";
>>>>>>> origin/feature/backend

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