import StatCard from "../components/cards/StatCard";
import RecentStudents from "../components/dashboard/RecentStudents";
import PlacementChart from "../components/charts/PlacementChart";
import useDashboardStats from "../hooks/useDashboardStats";

export default function Dashboard() {
  const stats = useDashboardStats();

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's an overview of your placement portal.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Students" value={stats.students} />
        <StatCard title="Companies" value={stats.companies} />
        <StatCard title="Applications" value={stats.applications} />
        <StatCard title="Placed" value={stats.placed} />
      </div>

      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <PlacementChart />
        <RecentStudents />
      </div>
    </div>
  );
}