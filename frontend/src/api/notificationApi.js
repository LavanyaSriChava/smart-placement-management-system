import axios from "axios";

const API_URL =
<<<<<<< HEAD
  "http://localhost:5000/api/notifications";

=======
  "https://ovary-armless-distill.ngrok-free.dev/api/notifications";
>>>>>>> origin/feature/backend
export const getNotifications =
  async (userId) => {

    return axios.get(
      `${API_URL}/user/${userId}`
    );

};