function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-gray-500 text-lg font-medium">
            {title}
          </h2>

          <p className="text-4xl font-bold text-gray-800 mt-4">
            {value}
          </p>
        </div>

        <div className="text-4xl text-blue-600">
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;