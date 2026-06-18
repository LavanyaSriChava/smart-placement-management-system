import axios from "axios";

const API_URL =
  "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/applications";

export const getApplications = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateApplicationStatus = async (
  application,
  status
) => {
  const response = await axios.put(
    `http://localhost:8080/api/applications/status/${application.id}`,
    {
      studentId: application.studentId,
      companyId: application.companyId,
      status,
    }
  );

  return response.data;
};