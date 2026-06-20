/**
 * ガイド記事の good/bad リアクション API（匿名・累計カウント）
 */

import { get, post } from "./client";
import type {
  GuideReactionState,
  GuideReactionType,
} from "@/app/types/guide-reaction";

/** 公開: 記事(slug)の good/bad 累計を取得 */
export async function getGuideReactions(
  slug: string
): Promise<GuideReactionState> {
  return get<GuideReactionState>(`/guide-reactions/${slug}`);
}

/** 公開・匿名: 記事(slug)に good/bad を1票加算 */
export async function reactToGuide(
  slug: string,
  type: GuideReactionType
): Promise<GuideReactionState> {
  return post<GuideReactionState>(`/guide-reactions/${slug}`, { type });
}
