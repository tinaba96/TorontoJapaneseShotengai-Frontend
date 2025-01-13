"use client";

import { motion } from "framer-motion";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Toronto Japanese Shotengai (TJS)
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              トロントの日本人コミュニティをつなぐオンライン商店街
            </p>
            <a
              href="#"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300"
            >
              今すぐ参加
            </a>
          </motion.div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
              TJSの特徴
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Feature
                title="日本人コミュニティ"
                description="同じ境遇の日本人と出会い、つながりを深めることができます。"
                icon="👥"
              />
              <Feature
                title="日本の商品"
                description="懐かしい日本の商品や、トロントでは手に入りにくいアイテムを見つけられます。"
                icon="🛍️"
              />
              <Feature
                title="フリーマーケット"
                description="コミュニティ内で簡単に物々交換や売買ができる機能を提供しています。"
                icon="💱"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-100 p-6 rounded-lg text-center"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
