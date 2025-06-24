"use client";

import { useState } from "react";
import JobCard from "./JobCard";
import JobDetailModal from "./JobDetailModal";

interface Job {
  id: number;
  title: string;
  location: string;
  salary: string;
  type: string;
}

const jobs: Job[] = [
  {
    id: 1,
    title: "シェフ",
    location: "トロント・ダウンタウン",
    salary: "年収60,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 2,
    title: "バックエンドエンジニア",
    location: "トロント・ノースヨーク",
    salary: "年収75,000 CAD〜",
    type: "パートタイム",
  },
  {
    id: 3,
    title: "カフェマネージャー",
    location: "トロント・イーストヨーク",
    salary: "年収70,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 4,
    title: "ウェイター／ウェイトレス",
    location: "トロント・ダウンタウン",
    salary: "時給20 CAD〜",
    type: "パートタイム",
  },
  {
    id: 5,
    title: "フロントエンドエンジニア",
    location: "トロント郊外・ウォータールー",
    salary: "年収90,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 6,
    title: "マーケティングマネージャー",
    location: "トロント・ダウンタウン",
    salary: "年収100,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 7,
    title: "バリスタ",
    location: "トロント・イーストヨーク",
    salary: "時給18 CAD〜",
    type: "アルバイト",
  },
  {
    id: 8,
    title: "清掃スタッフ",
    location: "トロント・ノースヨーク",
    salary: "時給16 CAD〜",
    type: "アルバイト",
  },
  {
    id: 9,
    title: "プロジェクトマネージャー",
    location: "トロント・ミッドタウン",
    salary: "年収100,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 10,
    title: "UIデザイナー",
    location: "トロント・ダウンタウン",
    salary: "年収55,000 CAD〜",
    type: "アルバイト",
  },
  {
    id: 11,
    title: "UIデザイナー",
    location: "トロント・ダウンタウン",
    salary: "年収55,000 CAD〜",
    type: "アルバイト",
  },
  {
    id: 12,
    title: "Webデザイナー",
    location: "トロント・ダウンタウン",
    salary: "年収90,000 CAD〜",
    type: "正社員",
  },
];

export default function JobList() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApplySuccess = () => {
    setShowSuccessMessage(true);
    // 3秒後に成功メッセージを非表示
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* 成功メッセージ */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center">
            <span className="mr-2">✓</span>
            応募が完了しました！
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} onApply={handleApply} />
        ))}
      </div>

      {/* 求人詳細モーダル */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onApply={handleApplySuccess}
        />
      )}
    </div>
  );
}
