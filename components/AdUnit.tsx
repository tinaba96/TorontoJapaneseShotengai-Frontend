"use client";

import { useEffect } from "react";

/**
 * AdSense 広告ユニット（手動配置）。
 * - slot ID は承認後に AdSense 管理画面で発行 → NEXT_PUBLIC_ADSENSE_SLOT に設定
 * - slot 未設定の間は何も表示しない（空枠が出ない）
 * - レスポンシブ広告
 */
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8140225190723823";

export default function AdUnit({
  slot,
  className = "",
}: {
  slot?: string;
  className?: string;
}) {
  // 環境変数のデフォルトslot（個別指定が無ければこれを使う）
  const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT || "";

  useEffect(() => {
    if (!adSlot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      /* ignore */
    }
  }, [adSlot]);

  // slot未設定なら描画しない（承認前・ID未発行時に空白を出さない）
  if (!adSlot) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
