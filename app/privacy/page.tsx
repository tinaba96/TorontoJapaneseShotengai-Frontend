import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Toronto Japanese Shotengai",
  description:
    "Toronto Japanese Shotengai のプライバシーポリシー。アクセス解析・Cookie・広告配信における個人情報の取り扱いについて説明します。",
};

// ★ 連絡先メールアドレスはここを書き換えてください。
const CONTACT_EMAIL = "torontoshotengai@gmail.com";
const LAST_UPDATED = "2026年6月19日";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-display text-xl font-bold text-sumi-800">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-sumi-600">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-washi-50">
      <div className="container mx-auto max-w-3xl px-4 lg:px-8 py-14">
        <Link
          href="/"
          className="text-xs font-mono uppercase tracking-[0.3em] text-gold-500 hover:text-gold-600"
        >
          ← Toronto Japanese Shotengai
        </Link>

        <h1 className="mt-5 font-display text-3xl font-black text-sumi-800">
          プライバシーポリシー
        </h1>
        <p className="mt-3 text-sm text-sumi-500">
          Toronto Japanese Shotengai（以下「当サイト」といいます）は、利用者の個人情報を適切に保護することを重要な責務と考え、以下の方針に基づき個人情報を取り扱います。
        </p>

        <Section title="1. 取得する情報">
          <p>
            当サイトでは、より良いサービス提供のために以下の情報を取得することがあります。
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              内見予約などのフォームにご入力いただくお名前・メールアドレス・電話番号
            </li>
            <li>
              アクセス状況に関する情報（閲覧ページ、滞在時間、参照元、ブラウザ・端末の種類、IPアドレス等）
            </li>
            <li>Cookie および類似技術によって収集される情報</li>
          </ul>
        </Section>

        <Section title="2. 利用目的">
          <ul className="list-disc space-y-1 pl-5">
            <li>内見予約・お問い合わせへの対応および連絡のため</li>
            <li>当サイトの利用状況の分析およびサービス改善のため</li>
            <li>広告の配信・表示のため</li>
          </ul>
        </Section>

        <Section title="3. Cookie（クッキー）について">
          <p>
            当サイトでは、利用状況の把握や広告配信のために Cookie を使用しています。Cookie は利用者を個人として特定するものではありません。ブラウザの設定により Cookie の受け入れを拒否することができますが、その場合、当サイトの一部機能が利用できないことがあります。
          </p>
        </Section>

        <Section title="4. アクセス解析ツール（Google Analytics）について">
          <p>
            当サイトでは、サイトの利用状況を把握するために Google LLC が提供する「Google アナリティクス」を利用しています。Google アナリティクスは Cookie を使用してトラフィックデータを収集しますが、これらのデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p>
            この機能は、ブラウザのアドオンの設定や、Cookie を無効にすることで収集を拒否できます。詳細は{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sakura-600 underline hover:text-sakura-700"
            >
              Google のポリシーと規約
            </a>{" "}
            をご確認ください。
          </p>
        </Section>

        <Section title="5. 広告配信（Google AdSense）について">
          <p>
            当サイトでは、第三者配信の広告サービス「Google AdSense」を利用する場合があります。
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Google を含む第三者配信事業者は、Cookie を使用して、利用者の過去の当サイトや他サイトへのアクセス情報に基づき、適切な広告を表示します。
            </li>
            <li>
              利用者は{" "}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sakura-600 underline hover:text-sakura-700"
              >
                広告設定
              </a>{" "}
              でパーソナライズ広告を無効にできます。
            </li>
            <li>
              第三者配信事業者による Cookie の利用については{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sakura-600 underline hover:text-sakura-700"
              >
                www.aboutads.info
              </a>{" "}
              のページから無効にできます。
            </li>
          </ul>
          <p>
            広告配信における Cookie の取り扱いの詳細については、{" "}
            <a
              href="https://policies.google.com/technologies/ads?hl=ja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sakura-600 underline hover:text-sakura-700"
            >
              Google 広告に関するポリシー
            </a>{" "}
            をご確認ください。
          </p>
        </Section>

        <Section title="6. 第三者への提供">
          <p>
            当サイトは、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
          </p>
        </Section>

        <Section title="7. 個人情報の開示・訂正・削除">
          <p>
            利用者がご自身の個人情報の開示・訂正・削除を希望される場合は、下記のお問い合わせ先までご連絡ください。ご本人であることを確認のうえ、合理的な範囲で速やかに対応します。
          </p>
        </Section>

        <Section title="8. 免責事項">
          <p>
            当サイトに掲載された情報の正確性には努めておりますが、その完全性を保証するものではありません。当サイトからリンクする外部サイトの内容について、当サイトは責任を負いません。
          </p>
        </Section>

        <Section title="9. 本ポリシーの変更">
          <p>
            当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後の内容は、当ページに掲載した時点から効力を生じるものとします。
          </p>
        </Section>

        <Section title="10. お問い合わせ先">
          <p>
            本ポリシーに関するお問い合わせは、以下までご連絡ください。
            <br />
            メール：{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sakura-600 underline hover:text-sakura-700"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>

        <p className="mt-12 text-xs text-sumi-400">
          制定日：{LAST_UPDATED}
        </p>
      </div>
    </div>
  );
}
