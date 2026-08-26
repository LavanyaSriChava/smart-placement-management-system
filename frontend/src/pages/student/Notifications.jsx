import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";

import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../../api/notificationApi";

function Notifications() {

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchNotifications();

  }, []);

  const fetchNotifications =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const user =
          jwtDecode(token);

        const response =
          await getNotifications(user.id);

        console.log(
          "Notifications:",
          response.data
        );

        setNotifications(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);

      // Immediately update UI
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await deleteNotification(notificationId);

      // Immediately remove from UI
      setNotifications((prev) =>
        prev.filter(
          (notification) =>
            notification.id !== notificationId
        )
      );

    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-8">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-5xl font-bold text-slate-800">
          Notifications
        </h1>

        <p className="text-gray-500 text-lg mt-2">
          Stay updated with placement activities and application status
        </p>

      </div>

      <div className="bg-white rounded-3xl shadow-md p-6">

        {loading ? (

          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              Loading notifications...
            </p>
          </div>

        ) : notifications.length === 0 ? (

          <div className="text-center py-12">

            <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center">

              <FaBell
                size={40}
                className="text-blue-600"
              />

            </div>

            <h2 className="text-2xl font-semibold text-slate-800 mt-6">
              No Notifications Yet
            </h2>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Important updates regarding applications,
              companies, interviews and placement drives
              will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {notifications.map((notification) => (

              <div
                key={notification.id}
                className={`border rounded-2xl p-5 transition-all duration-300
      ${notification.isRead
                    ? "bg-gray-50"
                    : "bg-blue-50 border-blue-200"
                  }
    `}
              >

                <div className="flex items-start gap-4">

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center
          ${notification.isRead
                        ? "bg-gray-200"
                        : "bg-blue-100"
                      }
        `}
                  >

                    {notification.type === "SHORTLISTED" ? (
                      <FaCheckCircle
                        className={
                          notification.isRead
                            ? "text-gray-500"
                            : "text-green-600"
                        }
                      />
                    ) : (
                      <FaBuilding
                        className={
                          notification.isRead
                            ? "text-gray-500"
                            : "text-blue-600"
                        }
                      />
                    )}

                  </div>

                  {/* Content */}
                  <div className="flex-1">

                    <div className="flex justify-between items-start">

                      <h3 className="font-semibold text-lg text-slate-800">
                        {notification.title}
                      </h3>

                      {!notification.isRead && (
                        <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full">
                          New
                        </span>
                      )}

                    </div>

                    <p className="text-gray-600 mt-1">
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {notification.type}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-3 mt-4">

                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            handleMarkAsRead(notification.id)
                          }
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        >
                          Mark as Read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDelete(notification.id)
                        }
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            ))}
          </div>

        )}

      </div>

    </div>
  );
}

export default Notifications;