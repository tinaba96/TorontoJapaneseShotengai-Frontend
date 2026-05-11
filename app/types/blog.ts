/**
 * ブログ関連の型定義
 */

export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  image?: string;
  publishDate?: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  image?: string;
  publishDate?: string;
  creator_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export type BlogsResponse = Blog[];
