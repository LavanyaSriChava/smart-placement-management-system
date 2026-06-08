import StatCard from "../components/cards/StatCard";

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Students"
          value="1200"
        />

        <StatCard
          title="Companies"
          value="85"
        />

        <StatCard
          title="Applications"
          value="3400"
        />

        <StatCard
          title="Placed"
          value="760"
        />

      </div>
    </div>
  );
}