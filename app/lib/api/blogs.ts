/**
 * ブログ関連のAPI関数
 */

import { get, post } from "./client";
import type {
  Blog,
  CreateBlogRequest,
  BlogsResponse,
} from "@/app/types/blog";

export async function getBlogs(): Promise<BlogsResponse> {
  return get<BlogsResponse>("/blogs/");
}

export async function getBlogById(id: string): Promise<Blog> {
  return get<Blog>(`/blogs/${id}`);
}

export async function createBlog(data: CreateBlogRequest): Promise<Blog> {
  return post<Blog>("/blogs/", data, {
    requiresAuth: true,
  });
}
