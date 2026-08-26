import axios from "axios";

const API_URL =
  "http://localhost:5000/api/notifications";

// Get notifications for a student
export const getNotifications = async (userId) => {
  return axios.get(`${API_URL}/user/${userId}`);
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  return axios.put(`${API_URL}/read/${notificationId}`);
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  return axios.delete(`${API_URL}/${notificationId}`);
};