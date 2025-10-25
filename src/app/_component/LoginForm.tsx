// src/app/_component/LoginForm.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

//{ redirect = "/upload" }: { redirect?: string }
export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 실로그인 → 성공으로 가정
    //router.replace(redirect); // ✨ 다시 /upload 모달로
  };

  return (
    <form onSubmit={onSubmit} className="px-12 py-12 space-y-4">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="you@email.com"
          type="email"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide">Password</label>
        <input
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="••••••••"
          type="password"
          required
        />
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Sign in
      </button>
    </form>
  );
}