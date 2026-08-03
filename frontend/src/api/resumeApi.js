import axios from "axios";

const NODE_API =
<<<<<<< HEAD
  "http://localhost:5000/api/upload";


const SPRING_API =
  "http://localhost:8080/api/resumes";

export const uploadResume = async (file, companyId) => {

  const formData = new FormData();

  formData.append("resume", file);
  formData.append("companyId", companyId);

  const token = localStorage.getItem("token");
=======
  "https://ovary-armless-distill.ngrok-free.dev/api/upload";

const SPRING_API =
  "https://bruna-subvertebral-illustriously.ngrok-free.dev/api/resumes";

export const uploadResume = async (file) => {

  const formData = new FormData();

  formData.append(
    "resume",
    file
  );
>>>>>>> origin/feature/backend

  return axios.post(
    `${NODE_API}/resume`,
    formData,
    {
      headers: {
<<<<<<< HEAD
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

=======
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

};
>>>>>>> origin/feature/backend

export const getResumeByStudentId =
  async (studentId) => {

    return axios.get(
      `${SPRING_API}/student/${studentId}`
    );

<<<<<<< HEAD
  };
=======
};
>>>>>>> origin/feature/backend
