import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-shinsaibashi-blue text-black py-8 border-t border-black mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">商店街</h3>
            <p className="text-black">
              Toronto Japanese Shotengai とは
              トロントの日本人コミュニティをつなぐオンライン商店街
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-black hover:text-black">
                  TJSについて
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-black hover:text-black">
                  イベント
                </Link>
              </li>
              <li>
                <Link href="/fm" className="text-black hover:text-black">
                  フリマ
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-black hover:text-black">
                  会社概要
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">お問い合わせ</h3>
            <p className="text-black">
              123 Garden ave, Totontom, ONTARIO, M4N5M1
              <br />
              TEL: 06-1234-5678
              <br />
              Email: info@tjs.com
            </p>
          </div>
        </div>
        <div className="mt-8 text-center text-black">
          &copy; 2025 Toronto Japanese Shotengai All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
