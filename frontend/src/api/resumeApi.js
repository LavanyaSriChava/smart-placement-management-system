import axios from "axios";

const NODE_API =
  "http://localhost:5000/api/upload";


const SPRING_API =
  "http://localhost:8080/api/resumes";

export const uploadResume = async (file) => {

  const formData = new FormData();

  formData.append(
    "resume",
    file
  );

  return axios.post(
    `${NODE_API}/resume`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};

export const getResumeByStudentId =
  async (studentId) => {

    return axios.get(
      `${SPRING_API}/student/${studentId}`
    );

};