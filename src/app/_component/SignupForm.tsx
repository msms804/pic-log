// src/app/_component/SignupForm.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { SignupAction } from "../action/auth";

export default function SignupForm({redirect}: {redirect: string}) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      if(pw !== pwCheck){ // 비밀번호가 다른 경우 submit 막음
        e.preventDefault();
        setError("비밀번호가 일치하지 않습니다.")
      } else{ // signupAction 실행
        setError(null);
      }
    }

  return (
    <form action={SignupAction} onSubmit={onSubmit} className="px-12 py-12 space-y-4">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide">Email</label>
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="you@email.com"
          autoComplete="username"
          type="email"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide">Password</label>
        <input
          name="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="••••••••"
          autoComplete="new-password"
          type="password"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wide">Confirm Password</label>
        <input
          value={pwCheck}
          onChange={(e) => setPwCheck(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="••••••••"
          autoComplete="new-password"
          type="password"
          required
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Sign in
      </button>
      {/* {loading ? "회원가입 중..." : "Sign up"} */}
      <div className="text-xs text-neutral-500 text-center mt-2">
        이미 계정이 있으세요?{" "}
        <Link 
        href={`/login?redirect=${encodeURIComponent(redirect)}`}
        replace
        className="underline"
        >
          로그인으로 가기
        </Link>
      </div>
    </form>
  );
}