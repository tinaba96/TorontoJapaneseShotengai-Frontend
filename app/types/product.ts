/**
 * フリマ商品関連の型定義
 */

export interface CreateProductRequest {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  price: string;
  condition: string; // new | like-new | good | fair | poor
  category: string; // electronics | clothing | furniture | books | sports | other
  images?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  price: string;
  condition: string;
  category: string;
  images?: string;
  creator_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface UpdateProductRequest {
  title?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  price?: string;
  condition?: string;
  category?: string;
  images?: string;
}

export type ProductsResponse = Product[];
