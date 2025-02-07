import Header from "../components/layouts/Header";
// import MainVisual from '../components/MainVisual'
import NewsSection from "../components/News";
import MainCarousel from "../components/mainCarousel";
// import EventCalendar from '../components/EventCalendar'
// import ShopList from '../components/ShopList'
import Footer from "../components/layouts/Footer";
import AllContents from "@/components/AllContents/AllContents";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <MainCarousel />

        <AllContents />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
