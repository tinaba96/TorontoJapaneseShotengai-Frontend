/**
 * フリマ商品関連のAPI関数
 */

import { get, post } from "./client";
import type {
  Product,
  CreateProductRequest,
  ProductsResponse,
} from "@/app/types/product";

/**
 * 商品一覧を取得
 */
export async function getProducts(): Promise<ProductsResponse> {
  return get<ProductsResponse>("/products/");
}

/**
 * 新しい商品を作成
 * 認証が必要
 */
export async function createProduct(
  data: CreateProductRequest
): Promise<Product> {
  return post<Product>("/products/", data, {
    requiresAuth: true,
  });
}
