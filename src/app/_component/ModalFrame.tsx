"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const sizeMap = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
}
type Props = {
  title: string;
  children: ReactNode;
  size?: "md" | "lg" | "xl" | "2xl";
};  

export default function ModalFrame({ title, children, size = "md" }: Props) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100]">
      {/* 어두운 배경 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => router.back()}
      />

      {/* 모달 박스 */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        className={`
          absolute left-1/2 top-16 -translate-x-1/2
          w-full ${sizeMap[size]} rounded-xl bg-white shadow-2xl
          max-h-[85vh] overflow-y-auto
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <span className="text-sm font-semibold uppercase tracking-wide">
            {title}
          </span>
          <button
            onClick={() => router.back()}
            className="text-sm px-3 py-1.5 rounded border"
          >
            Close
          </button>
        </div>

        {/* Content (폼 들어가는 자리) */}
        {children}
      </motion.div>
    </div>
  );
}