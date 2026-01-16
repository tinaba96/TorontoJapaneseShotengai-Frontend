"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import JobList from "../../components/JobList";
import { getJobs } from "@/app/lib/api/jobs";
import type { Job } from "@/app/types/job";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);

        // 404エラー（求人なし）の場合は空の配列として扱う
        if (
          err &&
          typeof err === "object" &&
          "status" in err &&
          err.status === 404
        ) {
          setJobs([]);
          setError(null);
          return;
        }

        // その他のエラーメッセージの詳細を表示
        let errorMessage = "求人情報の読み込みに失敗しました";
        if (err && typeof err === "object") {
          const error = err as {
            status?: number;
            data?: { message?: string; detail?: string };
            message?: string;
          };
          if (error.data?.message) {
            errorMessage += `: ${error.data.message}`;
          } else if (error.data?.detail) {
            errorMessage += `: ${error.data.detail}`;
          } else if (error.message) {
            errorMessage += `: ${error.message}`;
          }
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
          求人情報
        </h1>

        {/* ローディング状態 */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        )}

        {/* エラー状態 */}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-800 font-semibold mb-2">エラー</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* データなし状態 */}
        {!isLoading && !error && jobs.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              求人情報がありません
            </h3>
            <p className="text-gray-600 mb-6">
              現在表示できる求人がありません
            </p>
            <Link
              href="/create"
              className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              求人を作成
            </Link>
          </div>
        )}

        {/* 求人一覧 */}
        {!isLoading && !error && jobs.length > 0 && <JobList jobs={jobs} />}
      </main>
      <Footer />
    </div>
  );
}
