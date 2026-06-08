import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    students: 0,
  });

  useEffect(() => {
    getUsers()
      .then((users) => {
        setStats({
          students: users.length,
        });
      })
      .catch(console.error);
  }, []);

  return stats;
}