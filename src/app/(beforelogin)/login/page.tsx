// src/app/(beforelogin)/login/page.tsx
import LoginForm from "@/app/_component/LoginForm";

export default function LoginPage() {
  return (
    <main className="px-10 pt-28 max-w-md mx-auto">
      <h1 className="text-xl font-bold tracking-tight uppercase mb-4">Login</h1>
      <LoginForm />
    </main>
  );
}