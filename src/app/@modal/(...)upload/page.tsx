// app/@modal/(...)upload/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import UploadForm from "@/app/_component/UploadForm";
import ModalFrame from "@/app/_component/ModalFrame";

export default function UploadInterceptModal() {
  const router = useRouter();
  const isAuthed = false; // TODO: 실제 인증 값으로 교체

  useEffect(() => {
    if (!isAuthed) {
      // router.replace("/login?redirect=/upload"); // URL도 /login으로 바뀌며 로그인 모달로 전환
      router.replace("/login"); // URL도 /login으로 바뀌며 로그인 모달로 전환
    }
  }, [isAuthed, router]);

  if (!isAuthed) return null; // 전환 중 잠시 비움

  return (
    <ModalFrame title="Upload" size="2xl">
      <UploadForm />
    </ModalFrame>
  );
}