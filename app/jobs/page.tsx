import JobList from "../../components/JobList";

import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center animate-fade-in">
          求人情報
        </h1>
        <JobList />
      </main>
      <Footer />
    </div>
  );
}
