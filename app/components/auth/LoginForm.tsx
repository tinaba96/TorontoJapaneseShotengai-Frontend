import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { useRouter } from "next/navigation";
import SakuraPetals from "@/components/decor/SakuraPetals";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login({
        username: email,
        password,
      });
      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage = err instanceof Error ? err.message : "不明なエラー";
      setError(`ログインに失敗しました: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-sumi text-washi-50 flex items-center justify-center px-4 py-16">
      {/* Aurora */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-sakura-500/25 blur-3xl animate-pulse-soft" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[32rem] w-[32rem] rounded-full bg-gold-500/20 blur-3xl" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
      <SakuraPetals density="light" />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-[10px] font-mono uppercase tracking-[0.4em] text-washi-100/60 hover:text-gold-300 transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sakura-400 animate-pulse" />
          ← Toronto Japanese Shotengai
        </Link>

        <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/15 p-8 md:p-10 shadow-elegant ring-1 ring-inset ring-white/10">
          <div className="absolute -top-4 -right-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-sakura text-white shadow-glow rotate-6">
            <Sparkles className="h-5 w-5" />
          </div>

          <div className="font-jp text-sm text-gold-300 tracking-[0.3em]">
            Login · ログイン
          </div>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-extrabold leading-tight text-washi-50">
            おかえりなさい、
            <br />
            <span className="text-gradient-gold">商店街へ</span>。
          </h1>
          <p className="mt-3 text-sm text-washi-100/70">
            アカウントにログインして、つづきを。
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email-address"
                className="block text-[10px] font-mono uppercase tracking-[0.3em] text-washi-100/60 mb-1.5"
              >
                Email · メール
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-washi-100/50" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-10 py-3 text-sm text-washi-50 placeholder-washi-100/40 outline-none transition-all focus:border-sakura-400/60 focus:bg-white/10 focus:ring-2 focus:ring-sakura-400/20"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[10px] font-mono uppercase tracking-[0.3em] text-washi-100/60 mb-1.5"
              >
                Password · パスワード
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-washi-100/50" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-10 py-3 text-sm text-washi-50 placeholder-washi-100/40 outline-none transition-all focus:border-sakura-400/60 focus:bg-white/10 focus:ring-2 focus:ring-sakura-400/20"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group relative w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-sakura px-6 py-3.5 text-sm font-bold text-white shadow-glow btn-glow transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:pointer-events-none"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ログイン中...
                </>
              ) : (
                <>
                  ログイン
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 divider-gold opacity-50" />

          <div className="mt-6 flex items-center justify-between text-xs text-washi-100/60">
            <span className="font-jp">縁を、つなぐ。</span>
            <Link
              href="/"
              className="font-semibold hover:text-gold-300 transition-colors"
            >
              ← ホームへ戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
