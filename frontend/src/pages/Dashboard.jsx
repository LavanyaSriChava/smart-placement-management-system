import StatCard from "../components/cards/StatCard";
import RecentStudents from "../components/dashboard/RecentStudents";
import useDashboardStats from "../hooks/useDashboardStats";
import PlacementChart from "../components/charts/PlacementChart";
export default function Dashboard() {
  const stats = useDashboardStats();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
  title="Students"
  value={stats.students}
/>

<StatCard
  title="Companies"
  value={stats.companies}
/>

<StatCard
  title="Applications"
  value={stats.applications}
/>

<StatCard
  title="Placed"
  value={stats.placed}
/>
      </div>

      {/* Recent Students */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <PlacementChart />
  <RecentStudents />
</div>
    </div>
  );
}