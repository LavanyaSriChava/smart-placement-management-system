function CompanyCard({ company }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-bold mb-4">
        {company.companyName}
      </h2>

      <p>
        <strong>Role:</strong> {company.role}
      </p>

      <p>
        <strong>CTC:</strong> {company.ctc} LPA
      </p>

      <p>
        <strong>Required CGPA:</strong> {company.requiredCgpa}
      </p>

      <p>
        <strong>Allowed Backlogs:</strong> {company.allowedBacklogs}
      </p>

      <p>
        <strong>Eligible Branches:</strong>
        {" "}
        {company.eligibleBranches}
      </p>

      <p>
        <strong>Required Skills:</strong>
        {" "}
        {company.requiredSkills}
      </p>

      <button
        className="mt-4 w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Apply
      </button>

    </div>
  );
}

export default CompanyCard;