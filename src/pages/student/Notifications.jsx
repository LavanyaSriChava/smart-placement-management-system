import { useEffect, useState } from "react";
import { getNotifications } from "../../api/notificationApi";
import {
  FaBell,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";

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

        const response =
          await getNotifications(1);

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

          {notifications.map(
            (notification) => (

              <div
                key={notification.id}
                className="
                  border
                  rounded-2xl
                  p-5
                  hover:shadow-md
                  transition-all
                  duration-300
                  bg-gray-50
                "
              >

                <div className="flex items-start gap-4">

                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">

                    {notification.type ===
                    "SHORTLISTED" ? (
                      <FaCheckCircle
                        className="text-green-600"
                      />
                    ) : (
                      <FaBuilding
                        className="text-blue-600"
                      />
                    )}

                  </div>

                  <div className="flex-1">

                    <h3 className="font-semibold text-lg text-slate-800">
                      {notification.title}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {notification.message}
                    </p>

                    <p className="text-sm text-gray-400 mt-2">
                      {notification.type}
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  </div>
);
}

export default Notifications;