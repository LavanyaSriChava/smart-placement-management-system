import axios from "axios";

const API_URL =
  "https://ovary-armless-distill.ngrok-free.dev/api/notifications";
export const getNotifications =
  async (userId) => {

    return axios.get(
      `${API_URL}/user/${userId}`
    );

};