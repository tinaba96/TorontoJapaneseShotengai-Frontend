"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "@/app/contexts/AuthContext";

/** 掲示板で投稿/コメント/リアクションする前のインラインGoogleログイン */
export default function LoginInline({ note }: { note?: string }) {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-sumi-100 bg-white p-5 text-center">
      <p className="mb-3 text-sm text-sumi-500">
        {note ?? "投稿・コメント・リアクションにはログインが必要です。"}
      </p>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={async (cred) => {
            setError(null);
            if (!cred.credential) {
              setError("Googleログインに失敗しました。");
              return;
            }
            try {
              await loginWithGoogle(cred.credential);
            } catch {
              setError("ログインに失敗しました。時間をおいて再度お試しください。");
            }
          }}
          onError={() => setError("Googleログインに失敗しました。")}
        />
      </div>
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
