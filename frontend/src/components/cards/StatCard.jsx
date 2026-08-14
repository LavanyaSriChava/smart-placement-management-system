import {
  Users,
  Building2,
  FileText,
  BriefcaseBusiness,
} from "lucide-react";

export default function StatCard({
  title,
  value,
}) {
  const icons = {
    Students: Users,
    Companies: Building2,
    Applications: FileText,
    Placed: BriefcaseBusiness,
  };

  const Icon = icons[title];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
      
      <div className="flex items-center justify-between">
        
        {/* Card content */}
        <div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            {title}
          </h3>

          <p className="text-4xl font-bold text-indigo-600 mt-3">
            {value}
          </p>
        </div>

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-indigo-100 flex items-center justify-center">
          {Icon && (
            <Icon
              size={30}
              className="text-indigo-600"
            />
          )}
        </div>

      </div>
    </div>
  );
}