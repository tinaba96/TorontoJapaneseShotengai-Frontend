/**
 * 求人関連の型定義
 */

// 求人作成リクエストの型
export interface CreateJobRequest {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  company: string;
  salary: string;
  location: string;
  jobType: string;
  requirements?: string;
}

// 求人レスポンスの型
export interface Job {
  id: string;
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  company: string;
  salary: string;
  location: string;
  jobType: string;
  requirements?: string;
  creator_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

// 求人更新リクエストの型
export interface UpdateJobRequest {
  title?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  company?: string;
  salary?: string;
  location?: string;
  jobType?: string;
  requirements?: string;
}

// 求人一覧取得のクエリパラメータ
export interface JobListQuery {
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  jobType?: string;
}

// 求人一覧レスポンス
export type JobsResponse = Job[];
