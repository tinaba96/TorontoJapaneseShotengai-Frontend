/**
 * お問い合わせ API
 */
import { post } from "./client";

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

/** 物件に関する質問を送信（admin へメール＋送信者へ自動返信） */
export async function sendContact(data: ContactRequest): Promise<{ ok: boolean }> {
  return post<{ ok: boolean }>("/contact", data);
}
