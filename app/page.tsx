import Header from "../components/layouts/Header";
import HeroShowcase from "../components/HeroShowcase";
import NewsSection from "../components/News";
import MainCarousel from "../components/mainCarousel";
import Footer from "../components/layouts/Footer";
import AllContents from "@/components/AllContents/AllContents";
import CtaSection from "../components/CtaSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroShowcase />
        <MainCarousel />
        <AllContents />
        <NewsSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
