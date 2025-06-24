import { MapPin, Briefcase, DollarSign } from "lucide-react";

interface JobCardProps {
  id: number;
  title: string;
  location: string;
  salary: string;
  type: string;
  onApply: (job: JobCardProps) => void;
}

export default function JobCard({
  id,
  title,
  location,
  salary,
  type,
  onApply,
}: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover animate-fade-in">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <Briefcase className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{type}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{salary}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() =>
            onApply({ id, title, location, salary, type, onApply })
          }
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          応募する
        </button>
      </div>
    </div>
  );
}
