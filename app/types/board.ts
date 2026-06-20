/**
 * 掲示板（board）関連の型定義
 */

export const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "🎉", "🙏"] as const;

export interface ReactionCount {
  emoji: string;
  count: number;
}

export interface ReactionState {
  reactions: ReactionCount[];
  my_reactions: string[];
}

export interface CommentOut {
  id: string;
  body: string;
  author_name: string;
  created_at: string;
  reactions: ReactionCount[];
  my_reactions: string[];
  can_delete: boolean;
}

export interface BoardPostSummary {
  id: string;
  title: string;
  author_name: string;
  created_at: string;
  comment_count: number;
  reaction_total: number;
}

export interface BoardPostDetail {
  id: string;
  title: string;
  body: string;
  author_name: string;
  created_at: string;
  reactions: ReactionCount[];
  my_reactions: string[];
  can_delete: boolean;
  comments: CommentOut[];
}

export interface CreatePostRequest {
  title: string;
  body: string;
}
