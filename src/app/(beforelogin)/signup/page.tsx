"use client";

import SignupForm from "@/app/_component/SignupForm";

export default function SignupPage() {
  return (
    <main className="px-10 pt-28 max-w-md mx-auto">
      <h1 className="text-xl font-bold tracking-tight uppercase mb-4">SignUp</h1>
      <SignupForm />
    </main>
  );
}