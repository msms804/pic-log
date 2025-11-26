"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePostAction } from "@/app/action/deletePost";

export default function DeleteButton({postId}: {postId: string}){
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleClick = () => {
        if(!confirm("정말 삭제하시겠습니까?\n 사진도 모두 삭제됩니다.")) return;

        startTransition(async () => {
            await deletePostAction(postId);
            // router.push("/edit") //홈으로 이동
            // router.refresh();   // 새 목록으로 갱신
        })
    }
    return (
        <button
        type="submit"
        className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 cursor-pointer hover:bg-red-100"
        onClick={handleClick}
        disabled={isPending}
        >
        {isPending ? "Deleting..." : "Delete"}
      </button>
    )
}