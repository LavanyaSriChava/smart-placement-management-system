import StatCard from "../components/cards/StatCard";
import useDashboardStats from "../hooks/useDashboardStats";

export default function Dashboard() {
  const stats = useDashboardStats();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Students"
          value={stats.students}
        />

        <StatCard
          title="Companies"
          value="0"
        />

        <StatCard
          title="Applications"
          value="0"
        />

        <StatCard
          title="Placed"
          value="0"
        />
      </div>
    </div>
  );
}