import JobCard from "./JobCard";

const jobs = [
  {
    id: 1,
    title: "シェフ",
    location: "トロント・ダウンタウン",
    salary: "年収60,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 2,
    title: "バックエンドエンジニア",
    location: "トロント・ノースヨーク",
    salary: "年収75,000 CAD〜",
    type: "パートタイム",
  },
  {
    id: 3,
    title: "カフェマネージャー",
    location: "トロント・イーストヨーク",
    salary: "年収70,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 4,
    title: "ウェイター／ウェイトレス",
    location: "トロント・ダウンタウン",
    salary: "時給20 CAD〜",
    type: "パートタイム",
  },
  {
    id: 5,
    title: "フロントエンドエンジニア",
    location: "トロント郊外・ウォータールー",
    salary: "年収90,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 6,
    title: "マーケティングマネージャー",
    location: "トロント・ダウンタウン",
    salary: "年収100,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 7,
    title: "バリスタ",
    location: "トロント・イーストヨーク",
    salary: "時給18 CAD〜",
    type: "アルバイト",
  },
  {
    id: 8,
    title: "清掃スタッフ",
    location: "トロント・ノースヨーク",
    salary: "時給16 CAD〜",
    type: "アルバイト",
  },
  {
    id: 9,
    title: "プロジェクトマネージャー",
    location: "トロント・ミッドタウン",
    salary: "年収100,000 CAD〜",
    type: "フルタイム",
  },
  {
    id: 10,
    title: "UIデザイナー",
    location: "トロント・ダウンタウン",
    salary: "年収55,000 CAD〜",
    type: "アルバイト",
  {
    id: 10,
    title: "UIデザイナー",
    location: "トロント・ダウンタウン",
    salary: "年収55,000 CAD〜",
    type: "アルバイト",
  }
  {
    id: 11,
    title: "WEbデザイナー",
    location: "トロント・ダウンタウン",
    salary: "年収900,000 CAD〜",
    type: "正社員",
  },
];

export default function JobList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}
