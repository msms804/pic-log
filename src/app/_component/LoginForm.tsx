// src/app/_component/LoginForm.tsx
"use client";

import { useState } from "react";
import { loginAction } from "../action/auth";
import Link from "next/link";

export default function LoginForm({redirect} : {redirect: string}) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <form action={loginAction} className="px-12 py-12 space-y-4">
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
          autoComplete="current-password"
          type="password"
          required
        />
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Sign in
      </button>
      <div className="text-xs text-neutral-500 text-center mt-2">
        처음이세요?{" "}
        <Link
          href={`/signup?redirect=${encodeURIComponent(redirect)}`}
          replace
          className="underline"        
        >
          회원가입하러 가기
        </Link>
      </div>
    </form>
  );
}