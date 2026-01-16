import { MapPin, Briefcase, DollarSign, Building } from "lucide-react";
import type { Job } from "@/app/types/job";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

// jobTypeの表示名変換
const getJobTypeLabel = (jobType: string): string => {
  const labels: Record<string, string> = {
    fulltime: "正社員",
    parttime: "パートタイム",
    contract: "契約社員",
    intern: "インターン",
  };
  return labels[jobType] || jobType;
};

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover animate-fade-in">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          {job.title}
        </h2>
        <div className="flex items-center text-gray-600 mb-2">
          <Building className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{job.company}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-gray-600 mb-2">
          <Briefcase className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{getJobTypeLabel(job.jobType)}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <DollarSign className="w-5 h-5 mr-2 text-indigo-500" />
          <span>{job.salary}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <button
          onClick={() => onApply(job)}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
        >
          詳細を見る
        </button>
      </div>
    </div>
  );
}
