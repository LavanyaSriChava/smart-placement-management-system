import axios from "axios";

const API_URL =
<<<<<<< HEAD
   "http://localhost:8080/api/applications";
=======
   "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/applications";
>>>>>>> origin/feature/backend

export const getApplicationsByStudentId =
  async (studentId) => {

    return axios.get(
      `${API_URL}/student/${studentId}`
    );

};

export const getAllApplications =
  async () => {

    return axios.get(API_URL);

<<<<<<< HEAD
};

export const applyToCompany = async (
  studentId,
  companyId
) => {

  return axios.post(
    `${API_URL}/apply`,
    {
      studentId,
      companyId,
      status: "APPLIED"
    }
  );

=======
>>>>>>> origin/feature/backend
};