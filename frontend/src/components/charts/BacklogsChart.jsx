import { useEffect, useState } from "react";
import { getUsers } from "../../api/userApi";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts";

export default function BacklogsChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => {
        const noBacklogs = users.filter(
          (user) => user.backlogs === 0
        ).length;

        const hasBacklogs = users.filter(
          (user) => user.backlogs > 0
        ).length;

        setChartData([
  {
    name: "No Backlogs",
    value: noBacklogs,
  },
  {
    name: "Has Backlogs",
    value: hasBacklogs,
  },
].filter((item) => item.value > 0));
      })
      .catch(console.error);
  }, []);
if (chartData.length <= 1) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Backlogs Analysis
      </h2>

      <div className="text-gray-500 text-center py-10">
        Not enough data to visualize backlogs.
      </div>
    </div>
  );
}
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Backlogs Analysis
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}