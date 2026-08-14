export default function StatusBadge({ status }) {
  const normalizedStatus =
    status?.trim().toLowerCase();

  const colors = {
    eligible: "bg-blue-100 text-blue-700",
    placed: "bg-green-100 text-green-700",
    applied: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    shortlisted: "bg-purple-100 text-purple-700",
    student: "bg-blue-100 text-blue-700",
    admin: "bg-purple-100 text-purple-700",
  };

  const displayName =
    normalizedStatus
      ? normalizedStatus.charAt(0).toUpperCase() +
        normalizedStatus.slice(1)
      : "Unknown";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        colors[normalizedStatus] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {displayName}
    </span>
  );
}