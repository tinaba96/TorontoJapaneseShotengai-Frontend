"use client";

import { useState } from "react";
import {
  X,
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface JobDetailModalProps {
  job: {
    id: number;
    title: string;
    location: string;
    salary: string;
    type: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onApply: () => void;
}

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
          <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
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
                  <MapPin className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">勤務地:</span>
                  <span className="ml-2">{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Briefcase className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">雇用形態:</span>
                  <span className="ml-2">{job.type}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3 text-indigo-500" />
                  <span className="font-medium">給与:</span>
                  <span className="ml-2">{job.salary}</span>
                </div>
              </div>

              {/* 詳細情報 */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    職務内容
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {job.title}
                    として、チームと協力しながら業務を遂行していただきます。
                    経験やスキルに応じて、適切なサポートを提供いたします。
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    応募資格
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      関連する経験をお持ちの方
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      コミュニケーション能力の高い方
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      責任感があり、チームワークを大切にできる方
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    勤務時間
                  </h3>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
                    <span>月曜日〜金曜日 9:00-18:00（休憩1時間）</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    福利厚生
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 社会保険完備</li>
                    <li>• 各種手当</li>
                    <li>• 有給休暇</li>
                    <li>• 研修制度</li>
                  </ul>
                </div>
              </div>

              {/* 応募ボタン */}
              <div className="mt-8 pt-6 border-t">
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isApplying ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      応募中...
                    </div>
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
                  応募番号: {job.id.toString().padStart(6, "0")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
