import axios from "axios";

const API_URL =
   "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/applications";

export const getApplicationsByStudentId =
  async (studentId) => {

    return axios.get(
      `${API_URL}/student/${studentId}`
    );

};

export const getAllApplications =
  async () => {

    return axios.get(API_URL);

};