/**
 * 求人関連のAPI関数
 */

import { get, post } from "./client";
import type { Job, CreateJobRequest, JobsResponse } from "@/app/types/job";

/**
 * 求人一覧を取得
 */
export async function getJobs(): Promise<JobsResponse> {
  return get<JobsResponse>("/jobs/");
}

/**
 * 新しい求人を作成
 * 認証が必要
 */
export async function createJob(data: CreateJobRequest): Promise<Job> {
  return post<Job>("/jobs/", data, {
    requiresAuth: true,
  });
}
