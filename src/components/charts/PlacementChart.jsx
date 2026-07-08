import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function PlacementChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => {
        const cgpaRanges = {
          "7-8": 0,
          "8-9": 0,
          "9-10": 0,
        };

        users.forEach((user) => {
          const cgpa = user.cgpa;

          if (cgpa >= 7 && cgpa < 8) {
            cgpaRanges["7-8"]++;
          } else if (cgpa >= 8 && cgpa < 9) {
            cgpaRanges["8-9"]++;
          } else if (cgpa >= 9) {
            cgpaRanges["9-10"]++;
          }
        });

        const data = Object.entries(cgpaRanges).map(
          ([range, count]) => ({
            range,
            students: count,
          })
        );

        setChartData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        CGPA Distribution
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}