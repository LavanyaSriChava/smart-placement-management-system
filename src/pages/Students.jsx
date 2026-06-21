import { useState } from "react";
import StudentTable from "../components/tables/StudentTable";

export default function Students() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Students
        </h1>

        <input
          type="text"
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-72"
        />
      </div>

      <StudentTable search={search} />
    </div>
  );
}