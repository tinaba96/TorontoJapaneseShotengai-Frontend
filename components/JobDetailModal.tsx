"use client";

import { useState } from "react";
import {
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Building,
  Mail,
  Phone,
  CheckCircle,
  FileText,
} from "lucide-react";
import type { Job } from "@/app/types/job";

interface JobDetailModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
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

// statusの表示名変換
const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    open: "募集中",
    closed: "募集終了",
  };
  return labels[status] || status;
};

export default function JobDetailModal({
  job,
  isOpen,
  onClose,
  onApply,
}: JobDetailModalProps) {
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = () => {
    setIsApplying(true);
    // 応募処理のシミュレーション
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
      onApply();
      // 3秒後にモーダルを閉じる
      setTimeout(() => {
        setIsApplied(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
            <span
              className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
                job.status === "open"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {getStatusLabel(job.status)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          {!isApplied ? (
            <>
              {/* 基本情報 */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600">
                  <Building className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">会社名:</span>
                  <span className="ml-2">{job.company}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">勤務地:</span>
                  <span className="ml-2">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">雇用形態:</span>
                  <span className="ml-2">{getJobTypeLabel(job.jobType)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">給与:</span>
                  <span className="ml-2">{job.salary}</span>
                </div>
              </div>

              {/* 詳細情報 */}
              <div className="space-y-6">
                {/* 職務内容 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-indigo-500" />
                    職務内容
                  </h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                  </p>
                </div>

                {/* 応募資格 */}
                {job.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      応募資格
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                      {job.requirements}
                    </p>
                  </div>
                )}

                {/* 連絡先 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    連絡先
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-5 h-5 mr-3 text-indigo-500" />
                      <a
                        href={`mailto:${job.contactEmail}`}
                        className="text-indigo-600 hover:underline"
                      >
                        {job.contactEmail}
                      </a>
                    </div>
                    {job.contactPhone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="w-5 h-5 mr-3 text-indigo-500" />
                        <a
                          href={`tel:${job.contactPhone}`}
                          className="text-indigo-600 hover:underline"
                        >
                          {job.contactPhone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 応募ボタン */}
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={handleApply}
                  disabled={isApplying || job.status === "closed"}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isApplying ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      応募中...
                    </div>
                  ) : job.status === "closed" ? (
                    "募集終了"
                  ) : (
                    "応募する"
                  )}
                </button>
              </div>
            </>
          ) : (
            /* 応募完了表示 */
            <div className="text-center py-12">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                応募完了
              </h3>
              <p className="text-gray-600 mb-4">
                ご応募ありがとうございます。
                <br />
                後日、担当者よりご連絡いたします。
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  応募先: {job.company} - {job.title}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
