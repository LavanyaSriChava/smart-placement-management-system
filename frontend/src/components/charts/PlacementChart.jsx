import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", placed: 10 },
  { month: "Feb", placed: 25 },
  { month: "Mar", placed: 40 },
  { month: "Apr", placed: 60 },
];

export default function PlacementChart() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Placement Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="placed"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}