import BranchChart from "../components/charts/BranchChart";
import PlacementChart from "../components/charts/PlacementChart";
import BacklogsChart from "../components/charts/BacklogsChart";

export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BranchChart />
        <PlacementChart />
      </div>

      <div className="mt-6">
        <BacklogsChart />
      </div>
    </div>
  );
}