// app/edit/page.tsx
import Link from "next/link";
import { supabase } from "../../../../utils/supabase/supabase";

export default async function EditListPage() {

    const {data, error} = await supabase
    .from("posts")
    .select( 
        `
        id,
        shot_date,
        location,
        post_images (
          storage_path,
          order_index
        )
      `
    )
    .order("shot_date", {ascending: false})
  
    const posts = (data ?? []).map((p) => {
      const ordered = [...(p.post_images ?? [])].sort(
        (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
      )
      const first = ordered[0]

      const thumburl = first 
      ? supabase.storage.from("images").getPublicUrl(first.storage_path).data
      .publicUrl
      : "/placeholder.jpeg" // 대체 이미지

      return {
        id: p.id,
        shot_date: p.shot_date,
        location: p.location,
        thumbnail: thumburl,
      }
    })
  return (
    <main className="min-h-screen bg-neutral-50 pt-20 px-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            My Posts
          </h1>
        </header>

        <ul className="space-y-4">
          {posts.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-black/60"
            >
              {/* 대표 이미지 */}
              <div className="h-20 w-20 overflow-hidden rounded-xl bg-neutral-100 border border-neutral-200 shrink-0">
                <img
                  src={p.thumbnail}
                  alt="thumbnail"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* 정보 */}
              <div className="flex flex-col justify-center text-sm flex-1">
                <span className="text-[11px] text-neutral-500">{p.shot_date}</span>
                <span className="font-medium text-neutral-900">{p.location}</span>
              </div>

              {/* 버튼 */}
              <Link
                href={`/edit/${p.id}`}
                className="rounded-full border border-neutral-300 px-3 py-1.5 text-[11px] uppercase tracking-wide hover:border-black hover:bg-neutral-50"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}