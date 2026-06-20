import Link from "next/link";
import Image from "next/image";

/**
 * ブログ（渡航ガイド）専用レイアウト。
 * 既存の共通ヘッダー（商店街ナビ）は使わず、賃貸/ブログ用の軽いシェルにする。
 */
export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-washi-50">
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-sumi-100/30">
        <div className="divider-gold" />
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Toronto Japanese"
            >
              <div className="relative h-10 w-10 rounded-full ring-1 ring-gold-300/60 bg-white p-1 shadow-sm">
                <Image
                  src="/images/tjs.png"
                  alt="Toronto Japanese"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-display text-base font-bold text-sumi-700 tracking-wide">
                  Toronto Japanese
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-500 font-semibold">
                  Blog · ブログ
                </span>
              </div>
            </Link>

            <Link
              href="/guide"
              className="text-sm font-medium text-sumi-600 hover:text-sakura-600"
            >
              記事一覧
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t border-sumi-100/50 bg-white/60">
        <div className="container mx-auto px-4 lg:px-8 py-8 text-center text-xs text-sumi-400">
          <div>© Toronto Japanese — トロントの日本人コミュニティ</div>
          <div className="mt-2 flex items-center justify-center gap-4">
            <Link href="/" className="text-sumi-400 underline hover:text-sakura-600">
              賃貸トップ
            </Link>
            <Link
              href="/privacy"
              className="text-sumi-400 underline hover:text-sakura-600"
            >
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
