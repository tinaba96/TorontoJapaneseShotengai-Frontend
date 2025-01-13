"use client";

import { motion } from "framer-motion";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

interface InfoProps {
  title: string;
  content: string;
}

interface CardProps {
  title: string;
  description: string;
}

export default function Company() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        <motion.h1
          className="text-4xl font-bold text-indigo-600 mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          会社概要
        </motion.h1>
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              企業情報
            </h2>
            <table className="w-full">
              <tbody>
                <InfoRow title="会社名" content="ACME株式会社" />
                <InfoRow title="設立" content="2010年4月1日" />
                <InfoRow title="資本金" content="1億円" />
                <InfoRow title="従業員数" content="150名" />
                <InfoRow
                  title="事業内容"
                  content="ITコンサルティング、ソフトウェア開発、クラウドサービス提供"
                />
                <InfoRow
                  title="所在地"
                  content="〒100-0005 東京都千代田区丸の内1-1-1"
                />
              </tbody>
            </table>
          </motion.div>
          <motion.div {...fadeIn}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              企業理念
            </h2>
            <p className="text-gray-600 leading-relaxed">
              ACMEは、革新的な技術とクリエイティブな発想で、お客様のビジネスに価値を提供し、
              社会の発展に貢献することを使命としています。私たちは常に挑戦し続け、
              未来を創造する企業であり続けることを目指しています。
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
              ビジョン
            </h3>
            <p className="text-gray-600 leading-relaxed">
              テクノロジーの力で、人々の生活をより豊かに、より便利に、そしてより楽しくする。
              私たちは、この vision を実現するために日々努力を重ねています。
            </p>
          </motion.div>
        </div>
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            私たちの強み
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StrengthCard
              title="革新的な技術"
              description="最新のテクノロジーを駆使し、常に業界の最前線で革新的なソリューションを提供します。"
            />
            <StrengthCard
              title="顧客中心主義"
              description="お客様のニーズを深く理解し、カスタマイズされたサービスを提供することで、長期的な信頼関係を築きます。"
            />
            <StrengthCard
              title="グローバルな視点"
              description="国際的なネットワークを活かし、グローバル市場でのビジネス展開をサポートします。"
            />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

const InfoRow = ({ title, content }: InfoProps) => (
  <tr className="border-b border-gray-200">
    <td className="py-2 font-semibold text-gray-700">{title}</td>
    <td className="py-2 text-gray-600">{content}</td>
  </tr>
);

const StrengthCard = ({ title, description }: CardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-lg font-semibold text-indigo-600 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);
