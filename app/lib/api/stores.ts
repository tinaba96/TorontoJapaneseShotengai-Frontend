/**
 * 商店街（店舗）関連のAPI関数
 */

import { get, post } from "./client";
import type {
  Store,
  CreateStoreRequest,
  StoresResponse,
} from "@/app/types/store";

/**
 * 店舗一覧を取得
 */
export async function getStores(): Promise<StoresResponse> {
  return get<StoresResponse>("/stores/");
}

/**
 * 新しい店舗を作成
 * 認証が必要
 */
export async function createStore(
  data: CreateStoreRequest
): Promise<Store> {
  return post<Store>("/stores/", data, {
    requiresAuth: true,
  });
}
