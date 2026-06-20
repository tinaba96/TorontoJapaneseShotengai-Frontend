"use client";

import { MessageCircle } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";

// 友だち追加URL（必要なら Vercel の NEXT_PUBLIC_LINE_URL で上書き可）
const LINE_URL =
  process.env.NEXT_PUBLIC_LINE_URL || "https://lin.ee/s3EbErH";

export default function LineButton() {
  return (
    <a
      href={LINE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => sendGAEvent("event", "line_click")}
      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5"
      style={{ backgroundColor: "#06C755" }}
    >
      <MessageCircle className="h-4 w-4" />
      LINEで相談する
    </a>
  );
}
