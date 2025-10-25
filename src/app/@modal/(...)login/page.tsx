// app/@modal/(...)login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import LoginForm from "@/app/_component/LoginForm";
import ModalFrame from "@/app/_component/ModalFrame";

export default function LoginModal() {
  const router = useRouter();
  const sp = useSearchParams();
  const redirect = sp.get("redirect") || "/";

  return (
      <ModalFrame title="Login" >
        {/* <LoginForm redirect={redirect} /> */}
        <LoginForm />
      </ModalFrame>
  );
}