import ProductList from "../../components/ProductList";
import HeroSection from "../../components/HeroSection";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <HeroSection />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          人気の商品
        </h2>
        <ProductList />
      </main>
      <Footer />
    </div>
  );
}
