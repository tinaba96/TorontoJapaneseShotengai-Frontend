import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 賃貸(内見予約)を“今回のメイン”にするためのフラグ。
 *
 * true  : 賃貸特化モード。
 *         - ルート `/` は賃貸ページ(/viewing)を表示（URLは / のまま）
 *         - 商店街/MAP/フリマ等の既存ページは `/` に退避して“見れない”ようにする
 *         - 既存コードは一切削除していないので、いつでも戻せる
 * false : 元の全機能サイト（商店街など）に戻す。
 */
const RENTAL_ONLY = true;

// 賃貸モードでも通す（表示してよい）パス。
function isAllowed(pathname: string): boolean {
  if (pathname === "/") return true; // ルートは下で /viewing にrewrite
  if (pathname === "/viewing" || pathname.startsWith("/viewing/")) return true;
  if (pathname === "/board" || pathname.startsWith("/board/")) return true; // 掲示板
  if (pathname === "/privacy") return true; // プライバシーポリシー（AdSense審査用）
  return false;
}

export function middleware(req: NextRequest) {
  if (!RENTAL_ONLY) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // ルートは賃貸ページを表示（URLは / のまま＝メイン化）
  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/viewing", req.url));
  }

  // /viewing 配下はそのまま
  if (isAllowed(pathname)) {
    return NextResponse.next();
  }

  // それ以外（商店街・MAP・フリマ・求人・イベント等）は賃貸トップへ退避
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  // 静的アセット・画像・Next内部は対象外
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml|json)).*)",
  ],
};
