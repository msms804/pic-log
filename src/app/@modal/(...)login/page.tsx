// app/@modal/(...)login/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import LoginForm from "@/app/_component/LoginForm";
import ModalFrame from "@/app/_component/ModalFrame";

export default function LoginModal() {
  const sp = useSearchParams();
  const redirect = sp.get("redirect") || "/";

  return (
      <ModalFrame title="Login" >
        <LoginForm redirect={redirect} />
        {/* <LoginForm /> */}
      </ModalFrame>
  );
}