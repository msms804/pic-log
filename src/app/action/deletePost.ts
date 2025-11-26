// src/app/action/deletePost.ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deletePostAction(postId: string) {
  const supabase = await createClient();

  // 0) 이 포스트가 내 것인지 체크하고 싶으면 여기서 auth.getUser() + posts.user_id 비교
  //    (지금은 RLS로 막았다면 생략 가능)

  // 1) 이 포스트에 연결된 이미지 정보 먼저 가져오기
  const { data: images, error: imgSelectErr } = await supabase
    .from("post_images")
    .select("storage_path")
    .eq("post_id", postId);

  if (imgSelectErr) {
    console.error("post_images 조회 실패:", imgSelectErr);
    throw imgSelectErr;
  }

  // 2) 스토리지에서 실제 파일 삭제
  if (images && images.length > 0) {
    const paths = images.map((img) => img.storage_path);

    const { error: storageErr } = await supabase
      .storage
      .from("images")
      .remove(paths);

    if (storageErr) {
      console.error("Storage 이미지 삭제 실패:", storageErr);
      // 여기서 바로 throw 할지, 일단 DB만 지울지 정책에 따라 결정
      throw storageErr;
    }
  }

  // 3) post_images row 삭제 (CASCADE 있으면 이 부분은 생략 가능)
  const { error: imgDeleteErr } = await supabase
    .from("post_images")
    .delete()
    .eq("post_id", postId);

  if (imgDeleteErr) {
    console.error("post_images 삭제 실패:", imgDeleteErr);
    throw imgDeleteErr;
  }

  // 4) posts 삭제
  const { error: postErr } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

  if (postErr) {
    console.error("posts 삭제 실패:", postErr);
    throw postErr;
  }

  // 5) edit 리스트 다시 불러오도록
  revalidatePath("/edit");  
  redirect("/edit")
}