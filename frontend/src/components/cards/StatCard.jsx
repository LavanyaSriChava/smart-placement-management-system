export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
        {title}
      </h3>

      <p className="text-4xl font-bold text-indigo-600 mt-3">
        {value}
      </p>
    </div>
  );
}