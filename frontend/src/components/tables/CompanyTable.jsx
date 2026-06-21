export default function CompanyTable({
  companies,
  onDelete,
  onEdit,
}) {
  if (!companies || companies.length === 0) {
  return (
    <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
      No companies available
    </div>
  );
}
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
  <tr>
    <th className="p-3 text-left">Company</th>
    <th className="p-3 text-left">Role</th>
    <th className="p-3 text-left">CTC</th>
    <th className="p-3 text-left">CGPA</th>
    <th className="p-3 text-left">Action</th>
  </tr>
</thead>

        <tbody>
          {companies.map((company) => (
            <tr
              key={company.id}
              className="border-t hover:bg-gray-50"
            >
             <td className="p-3">
  {company.companyName}
</td>

<td className="p-3">
  {company.role}
</td>

<td className="p-3 font-medium text-green-600">
  ₹{company.ctc} LPA
</td>

<td className="p-3">
  {company.requiredCgpa}/10
</td>
              <td className="p-3">
                <button
  onClick={() => onEdit(company)}
  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
>
  Edit
</button>

                <button
  onClick={() => {
    if (
      window.confirm(
        `Are you sure you want to delete ${company.companyName}?`
      )
    ) {
      onDelete(company.id);
    }
  }}
  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded ml-2"
>
  Delete
</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}