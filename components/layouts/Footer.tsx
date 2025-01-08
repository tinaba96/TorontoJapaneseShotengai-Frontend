import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-shinsaibashi-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">商店街</h3>
            <p className="text-gray-300">
              Toronto Japanese Shotengai is the place where o斎橋は大阪の中心地にある商業地区です。ショッピング、グルメ、エンターテイメントなど、様々な魅力にあふれています。
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  心斎橋について
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white">
                  イベント
                </Link>
              </li>
              <li>
                <Link href="/shops" className="text-gray-300 hover:text-white">
                  ショップ
                </Link>
              </li>
              <li>
                <Link href="/access" className="text-gray-300 hover:text-white">
                  アクセス
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
            <p className="text-gray-300">
              〒542-0085
              <br />
              大阪府大阪市中央区心斎橋筋2丁目1-1
              <br />
              TEL: 06-1234-5678
              <br />
              Email: info@shinsaibashi.or.jp
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          &copy; 2023 心斎橋商店街振興組合. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
