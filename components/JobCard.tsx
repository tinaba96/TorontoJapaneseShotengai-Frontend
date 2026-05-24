import { MapPin, Briefcase, DollarSign, Building, ArrowUpRight } from "lucide-react";
import type { Job } from "@/app/types/job";

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

const getJobTypeLabel = (jobType: string): string => {
  const labels: Record<string, string> = {
    fulltime: "正社員",
    parttime: "パートタイム",
    contract: "契約社員",
    intern: "インターン",
  };
  return labels[jobType] || jobType;
};

const jobTypeAccent: Record<string, string> = {
  fulltime: "bg-gradient-sakura text-white",
  parttime: "bg-gradient-gold text-sumi-900",
  contract: "bg-sumi-800 text-washi-50",
  intern: "bg-washi-100 text-sumi-700 border border-sumi-200",
};

export default function JobCard({ job, onApply }: JobCardProps) {
  const typeClass = jobTypeAccent[job.jobType] || "bg-sumi-800 text-washi-50";
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white border border-sumi-100 shadow-glow-soft transition-all duration-500 hover:shadow-elegant hover:-translate-y-1 hover:border-sakura-200 animate-fade-in">
      {/* Top hairline */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sakura-400 via-gold-400 to-sumi-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-7">
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-glow-soft ${typeClass}`}>
            <Briefcase className="h-3 w-3" />
            {getJobTypeLabel(job.jobType)}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sumi-400">
            #{job.id}
          </span>
        </div>

        <h2 className="mt-4 font-display text-xl font-bold text-sumi-800 group-hover:text-sakura-600 transition-colors line-clamp-2 min-h-[3.5rem]">
          {job.title}
        </h2>

        <div className="mt-4 space-y-2 text-sm text-sumi-600">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-gold-500 shrink-0" />
            <span className="truncate">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sakura-500 shrink-0" />
            <span className="truncate">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gold-500 shrink-0" />
            <span className="truncate font-semibold text-sumi-800">{job.salary}</span>
          </div>
        </div>
      </div>

      <div className="px-7 pb-7">
        <button
          onClick={() => onApply(job)}
          className="group/btn w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura text-white py-2.5 text-sm font-bold shadow-glow btn-glow transition-all hover:-translate-y-0.5"
        >
          詳細を見る
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
        </button>
      </div>
    </div>
  );
}
