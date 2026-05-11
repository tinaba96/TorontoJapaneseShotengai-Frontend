/**
 * ニュース関連の型定義
 */

export interface CreateNewsRequest {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  image?: string;
  author?: string;
  tags?: string[];
  publishDate?: string;
}

export interface News {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  image?: string;
  author?: string;
  tags?: string[];
  publishDate?: string;
  creator_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export type NewsResponse = News[];
