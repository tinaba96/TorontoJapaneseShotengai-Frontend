import { ImageResponse } from "next/og";

// ブログ一覧 /guide 専用の動的OG画像（ブランド入り・1200×630）。
// 記事ページ /guide/[slug] は各記事の generateMetadata でサムネを指定するため上書きされる。

export const alt = "ブログ｜はじめてのトロント — Toronto Japanese";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 日本語グリフを描画するため、使用文字だけをサブセットして Noto Sans JP を取得。
// 取得に失敗した場合はカスタムフォントなし（英字のみ綺麗に）でフォールバック。
async function loadJpFont(text: string): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(
      text
    )}`;
    const css = await (
      await fetch(url, {
        headers: {
          // woff2 の src を得るために UA を指定
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      })
    ).text();
    const src = css.match(/src:\s*url\((.+?)\)\s*format/);
    if (!src) return null;
    const res = await fetch(src[1]);
    if (!res.ok) return null;
    return await res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const titleJp = "はじめてのトロント";
  const subJp = "ワーホリ・留学の最初の一歩をまとめたブログ";
  const jpFont = await loadJpFont(titleJp + subJp);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "84px",
          background:
            "linear-gradient(135deg, #16162b 0%, #0d0d1f 55%, #070713 100%)",
          position: "relative",
        }}
      >
        {/* 上部のゴールド光彩 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 280,
            background:
              "radial-gradient(80% 100% at 30% 0%, rgba(212,175,55,0.22), rgba(255,107,157,0.10) 45%, transparent 70%)",
          }}
        />
        {/* 上端ヘアライン */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, transparent, #f5dc83 35%, #d4af37 50%, #ff6b9d 70%, transparent)",
          }}
        />

        {/* キッカー */}
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: 8,
            fontWeight: 700,
            color: "#f5dc83",
            textTransform: "uppercase",
          }}
        >
          Toronto Japanese · Blog
        </div>

        {/* タイトル（日本語） */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#ffffff",
          }}
        >
          {titleJp}
        </div>

        {/* サブタイトル（日本語） */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 38,
            fontWeight: 700,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          {subJp}
        </div>

        {/* フッターのドメイン */}
        <div
          style={{
            position: "absolute",
            left: 84,
            bottom: 64,
            display: "flex",
            fontSize: 28,
            letterSpacing: 2,
            color: "rgba(245,220,131,0.85)",
          }}
        >
          toronto-shotengai.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: jpFont
        ? [{ name: "Noto Sans JP", data: jpFont, weight: 700, style: "normal" }]
        : undefined,
    }
  );
}
