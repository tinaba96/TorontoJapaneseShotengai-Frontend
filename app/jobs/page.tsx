"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Briefcase, Plus, ArrowUpRight } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-washi-50">
      <Header />
      <main className="flex-grow">
        {/* HERO */}
        <section className="relative isolate overflow-hidden bg-gradient-sumi text-washi-50">
          <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-gold-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-sakura-500/20 blur-3xl" />
          <div className="divider-gold" />
          <div className="relative container mx-auto px-4 lg:px-8 py-16 md:py-24">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              Careers · 求人情報
            </div>
            <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <h1 className="font-display font-black leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl">
                <span className="text-gradient-aurora">Find</span>{" "}
                <span className="italic text-gradient-gold">your role.</span>
              </h1>
              <Link
                href="/create"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5 self-start md:self-end"
              >
                <Plus className="h-4 w-4" />
                求人を投稿
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </Link>
            </div>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-washi-100/80">
              トロントの日本人コミュニティで、次のキャリアを。
              ローカル企業から、新しい挑戦まで。
            </p>
          </div>
          <div className="divider-gold" />
        </section>

        <section className="container mx-auto px-4 lg:px-8 py-16">
          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-2 border-sakura-100" />
                <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-t-sakura-500 animate-spin" />
              </div>
            </div>
          )}

          {error && !isLoading && (
            <div className="mx-auto max-w-xl rounded-3xl border border-red-200 bg-red-50/70 backdrop-blur p-8 text-center">
              <p className="text-red-700 font-semibold mb-2">エラー</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {!isLoading && !error && jobs.length === 0 && (
            <div className="mx-auto max-w-xl text-center py-12">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-sakura-50 to-gold-50 ring-1 ring-gold-200/50 shadow-glow-soft">
                <Briefcase className="h-9 w-9 text-gold-500" />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-sumi-800">
                まだ求人がありません
              </h3>
              <p className="mt-2 text-sm text-sumi-500">
                最初の求人投稿を、あなたの企業から。
              </p>
              <Link
                href="/create"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-sakura px-6 py-3 text-sm font-bold text-white shadow-glow"
              >
                <Plus className="h-4 w-4" />
                求人を投稿
              </Link>
            </div>
          )}

          {!isLoading && !error && jobs.length > 0 && <JobList jobs={jobs} />}
        </section>
      </main>
      <Footer />
    </div>
  );
}
