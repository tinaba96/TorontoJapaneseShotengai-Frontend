/**
 * 賃貸物件関連のAPI関数
 */

import { get, post } from "./client";
import type {
  PropertyApi,
  CreatePropertyRequest,
  PropertiesResponse,
} from "@/app/types/property";

/**
 * 賃貸物件一覧を取得
 */
export async function getProperties(): Promise<PropertiesResponse> {
  return get<PropertiesResponse>("/properties/");
}

/**
 * 新しい賃貸物件を作成
 * 認証が必要
 */
export async function createProperty(
  data: CreatePropertyRequest
): Promise<PropertyApi> {
  return post<PropertyApi>("/properties/", data, {
    requiresAuth: true,
  });
}
