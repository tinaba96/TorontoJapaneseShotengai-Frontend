import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            ページが見つかりません
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            ホームに戻る
          </Link>

          <div className="text-sm text-gray-500">
            <p>または、以下のページをご利用ください：</p>
            <div className="mt-2 space-x-4">
              <Link
                href="/map"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                マップ
              </Link>
              <Link
                href="/events"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                イベント
              </Link>
              <Link
                href="/blogs"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ブログ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
