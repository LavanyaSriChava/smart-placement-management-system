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

export default function BranchChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => {
        const branchCount = {};

        users.forEach((user) => {
          branchCount[user.branch] =
            (branchCount[user.branch] || 0) + 1;
        });

        const formattedData = Object.keys(branchCount).map(
          (branch) => ({
            branch,
            students: branchCount[branch],
          })
        );

        setChartData(formattedData);
      })
      .catch(console.error);
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
          <Bar dataKey="students" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}