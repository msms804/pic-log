import { notFound } from "next/navigation";
import { supabase } from "../../../../../utils/supabase/supabase";
import EditImageOrderClient from "../_component/EditImageOrderClient";
import { updatePostAction } from "@/app/action/updatePost";
import DeleteButton from "../_component/DeleteButton";

async function getPost(id: string) {
  const {data, error} = await supabase
  .from("posts")
  .select(
    `
    id,
    shot_date,
    location,
    description,
    post_images (
      id,
      storage_path,
      order_index
    )
  `
  )
  .eq("id", id)
  .single();

  if(error || !data){
    console.error("post detail error", error);
    return null;
  }

  const images = (data.post_images ?? [])
  .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
  .map((img) => ({
    id: String(img.id),
    order: img.order_index,
    url: 
    supabase.storage.from("images").getPublicUrl(img.storage_path).data.publicUrl,
  }))

  return {
    id: data.id,
    shot_date: data.shot_date,
    location: data.location,
    description: data.description,
    images,
  }
}

export default async function EditPage({params}: {params: {id: string}}) {
  const {id} = await params;  
  const post = await getPost(id)
    if (!post) notFound();
    return (
      // 전역 헤더(fixed) 만큼 아래에서 시작하도록 pt-24 추가
      <main className="min-h-screen bg-neutral-50 pt-12">
        <form action={updatePostAction}>
            <input type="hidden" name="post_id" value={post.id} />
        {/* ─────────────────────────────
            컨텐츠 영역
        ───────────────────────────── */}
        <div className="mx-auto grid max-w-5xl gap-8 px-6 pb-16 pt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* 왼쪽: 이미지 / 썸네일 편집 */}
          <section className="space-y-4">
            <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    Preview
                  </span>
                  <span className="text-xs text-neutral-500">
                    대표 이미지 + 순서 미리보기
                  </span>
                </div>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-medium text-neutral-600">
                  {post.images.length} photos
                </span>
              </div>
  
              {/* 메인 미리보기 */}
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={post.images[0]?.url}
                    alt="main preview"
                    className="h-full w-full object-cover"
                  />
                </div>
  
             <EditImageOrderClient initialImages={post.images}/>
            </div>
          </section>
  
          {/* 오른쪽: 메타데이터 편집 폼 */}
          <section className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Post Info
              </h2>
  
              <div className="mt-4 space-y-4 text-sm">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Date
                  </label>
                  <input
                    name="shot_date"
                    type="date"
                    defaultValue={post.shot_date}
                    className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:bg-white"
                  />
                </div>
  
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    defaultValue={post.location}
                    placeholder="City, Country"
                    className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:bg-white"
                  />
                </div>
  
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    defaultValue={post.description ?? ""}
                    placeholder="이 순간에 대한 짧은 노트나 기억을 적어보세요."
                    className="w-full resize-none rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:bg-white"
                  />
                  <p className="text-[11px] text-neutral-400">
                    2~3줄 정도의 짧은 메모로 남겨도 좋아요.
                  </p>
                </div>
              </div>
            </div>
  
            {/* 하단 보조 카드: 힌트 / 위험 영역 */}
            <div className="space-y-3 text-xs">
              <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-amber-900">
                <p className="font-medium">Tip</p>
                <p className="mt-1 text-[11px] leading-relaxed">
                  대표 이미지는 항상 첫 번째 사진이에요. 썸네일 영역에서{" "}
                  <span className="font-semibold">드래그 앤 드롭</span>으로 순서를
                  바꾸면, 메인 미리보기도 같이 바뀌게 만들 수 있어요.
                </p>
              </div>
  
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-red-900">
                <p className="font-medium">Danger zone</p>
                <p className="mt-1 text-[11px] leading-relaxed">
                  이 포스트를 삭제하면 연결된 사진과 기록도 모두 함께 사라집니다.
                  복구는 할 수 없으니, 정말 지우고 싶을 때만 삭제 버튼을
                  눌러주세요.
                </p>
              </div>
            </div>
            <div className="flex justify-end items-center gap-2">
               {/* 삭제 버튼 : 클라이언트 컴포넌트 */}
               <DeleteButton postId={post.id}/>
              {/* 저장 버튼 */}
              <button
                type="submit"
                className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white cursor-pointer hover:opacity-90"
              >
                Save changes
              </button>
            </div>
          </section>
        </div>
        </form>
      </main>
    );
  }