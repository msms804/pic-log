"use server";

import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";

export async function deletePostAction(formData: FormData){
    const supabase = await createClient();

    const postId = formData.get("post_id") as string;
    if(!postId) throw new Error("post_id 누락됨");

    // 1) 로그인 유저 확인
    const {
        data: {user},
        error: userErr,
    } = await supabase.auth.getUser();

    if(userErr || !user){
        console.error(userErr);
        throw new Error("로그인이 필요합니다.");
    }

    // 2) post_images 먼저 삭제
    const {error: imgErr} = await supabase
    .from("post_images")
    .delete()
    .eq("post_id", postId);

    if (imgErr) {
        console.error(imgErr);
        throw new Error("post_images 삭제 실패");
    }

    // 3) posts 삭제
    const {error: postErr} = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

    if(postErr) {
        console.error(postErr);
        throw new Error("post 삭제 실패");
    }

    redirect("/edit");
}