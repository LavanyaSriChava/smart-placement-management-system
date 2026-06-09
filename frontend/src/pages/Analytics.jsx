import PlacementChart from "../components/charts/PlacementChart";
import BranchChart from "../components/charts/BranchChart";
export default function Analytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Analytics
      </h1>

      <PlacementChart />
      <BranchChart />
    </div>
  );
}