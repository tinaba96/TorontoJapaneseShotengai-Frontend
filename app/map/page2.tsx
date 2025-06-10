import InteractiveMap from "@/components/map/interactive-map";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        インタラクティブ街マップ
      </h1>
      <div className="w-full max-w-6xl aspect-[4/3] border-4 border-gray-400 rounded-lg overflow-hidden shadow-2xl bg-white">
        <InteractiveMap />
      </div>
    </main>
  );
}
