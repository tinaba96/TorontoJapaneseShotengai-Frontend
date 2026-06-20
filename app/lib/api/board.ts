/**
 * 掲示板関連の API 関数
 */

import { get, post, del } from "./client";
import type {
  BoardPostSummary,
  BoardPostDetail,
  CommentOut,
  ReactionState,
  CreatePostRequest,
} from "@/app/types/board";

/** 公開: 投稿一覧（新着順） */
export async function listPosts(): Promise<BoardPostSummary[]> {
  return get<BoardPostSummary[]>("/board/posts");
}

/** 公開: 投稿詳細（ログイン中なら自分の反応/削除可否も付く） */
export async function getPost(id: string): Promise<BoardPostDetail> {
  return get<BoardPostDetail>(`/board/posts/${id}`, { optionalAuth: true });
}

/** 投稿作成（ログイン必須） */
export async function createPost(
  data: CreatePostRequest
): Promise<BoardPostDetail> {
  return post<BoardPostDetail>("/board/posts", data, { requiresAuth: true });
}

/** 投稿削除（投稿者本人 or admin） */
export async function deletePost(id: string): Promise<void> {
  return del<void>(`/board/posts/${id}`, { requiresAuth: true });
}

/** コメント作成（ログイン必須） */
export async function addComment(
  postId: string,
  body: string,
  displayName?: string
): Promise<CommentOut> {
  return post<CommentOut>(
    `/board/posts/${postId}/comments`,
    { body, display_name: displayName },
    { requiresAuth: true }
  );
}

/** コメント削除（投稿者本人 or admin） */
export async function deleteComment(commentId: string): Promise<void> {
  return del<void>(`/board/comments/${commentId}`, { requiresAuth: true });
}

/** 投稿へのリアクションをトグル（ログイン必須） */
export async function reactPost(
  postId: string,
  emoji: string
): Promise<ReactionState> {
  return post<ReactionState>(
    `/board/posts/${postId}/react`,
    { emoji },
    { requiresAuth: true }
  );
}

/** コメントへのリアクションをトグル（ログイン必須） */
export async function reactComment(
  commentId: string,
  emoji: string
): Promise<ReactionState> {
  return post<ReactionState>(
    `/board/comments/${commentId}/react`,
    { emoji },
    { requiresAuth: true }
  );
}
