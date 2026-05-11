/**
 * ニュース関連のAPI関数
 */

import { get, post } from "./client";
import type {
  News,
  CreateNewsRequest,
  NewsResponse,
} from "@/app/types/news";

export async function getNews(): Promise<NewsResponse> {
  return get<NewsResponse>("/news/");
}

export async function getNewsById(id: string): Promise<News> {
  return get<News>(`/news/${id}`);
}

export async function createNews(data: CreateNewsRequest): Promise<News> {
  return post<News>("/news/", data, {
    requiresAuth: true,
  });
}
