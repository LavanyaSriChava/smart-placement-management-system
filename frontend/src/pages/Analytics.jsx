import BranchChart from "../components/charts/BranchChart";
import PlacementChart from "../components/charts/PlacementChart";
import BacklogsChart from "../components/charts/BacklogsChart";

export default function Analytics() {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Analyze student data, branch distribution, CGPA trends, and backlogs.
        </p>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <BranchChart />
        <PlacementChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6">
        <BacklogsChart />
      </div>
    </div>
  );
}