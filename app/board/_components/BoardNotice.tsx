"use client";

import { AlertTriangle } from "lucide-react";

/** 掲示板の利用上の注意（違反時はアカウント停止の可能性） */
export default function BoardNotice() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-xs leading-relaxed text-amber-800">
      <div className="flex items-center gap-1.5 font-semibold">
        <AlertTriangle className="h-4 w-4" />
        ご利用にあたってのお願い
      </div>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>誹謗中傷・差別・スパム・無関係な宣伝・個人情報の投稿はご遠慮ください。</li>
        <li>
          規約に違反する投稿は予告なく削除し、悪質な場合は
          <span className="font-semibold">アカウントを停止する</span>ことがあります。
        </li>
        <li>投稿内容の責任は投稿者ご本人にあります。トラブルは当事者間でご解決ください。</li>
      </ul>
    </div>
  );
}
