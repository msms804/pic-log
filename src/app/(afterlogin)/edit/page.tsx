// app/edit/page.tsx
import Link from "next/link";
// TODO: Supabase에서 posts + post_images 테이블 join해서 데이터 가져오기

export default async function EditListPage() {
  const posts = [
    { 
      id: "1", 
      shot_date: "2024-01-01", 
      location: "Istanbul, Turkey",
      thumbnail: "/1.jpeg",
    },
    { 
      id: "2", 
      shot_date: "2024-02-10", 
      location: "Seoul, Korea",
      thumbnail: "/2.jpeg",
    },
  ];

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