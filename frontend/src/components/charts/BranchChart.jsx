import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

export default function BranchChart() {
  const [chartData, setChartData] = useState([]);

  // Colors for different branches
  const COLORS = [
    "#3b82f6", // Blue
    "#22c55e", // Green
    "#f59e0b", // Orange
    "#ef4444", // Red
    "#8b5cf6", // Purple
    "#06b6d4", // Cyan
    "#ec4899", // Pink
    "#84cc16", // Lime
    "#f97316", // Orange Dark
    "#14b8a6", // Teal
  ];

  useEffect(() => {
    getUsers()
      .then((users) => {
        const branchCount = {};

        users.forEach((user) => {
          if (user.branch) {
            branchCount[user.branch] =
              (branchCount[user.branch] || 0) + 1;
          }
        });

        const formattedData = Object.keys(branchCount).map((branch) => ({
          branch,
          students: branchCount[branch],
        }));

        setChartData(formattedData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Students By Branch
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="branch" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="students">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}