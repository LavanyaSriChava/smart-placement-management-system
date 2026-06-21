export default function RecentApplications() {
  const applications = [
    {
      student: "Rahul",
      company: "Google",
    },
    {
      student: "Priya",
      company: "Amazon",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Recent Applications
      </h2>

      {applications.map((app, index) => (
        <div
          key={index}
          className="flex justify-between border-b py-3"
        >
          <span>{app.student}</span>
          <span>{app.company}</span>
        </div>
      ))}
    </div>
  );
}