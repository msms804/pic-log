import Link from "next/link";
import ImageCard from "./_component/ImageCard";
import FloatingDock from "./_component/FloatingDock";
import { supabase } from "../../utils/supabase";

const COLS = 6;

function formatDateLabel(shot_date: string) {
  const d = new Date(shot_date);                  // "2024-01-01" → Date 객체로 변환
  if (Number.isNaN(d.getTime())) return shot_date; // 혹시 이상한 문자열이면 그냥 원본 반환
  const y = d.getFullYear();                      // 2024
  const m = d.toLocaleString("en-US", { month: "short" }); // "Jan"
  return `${y} ${m}`;                             // "2024 Jan"
}

async function fetchPosts(){
  const {data , error} = await supabase
  .from("posts")
  .select(
    `
    id,
    shot_date,
    location,
    description,
    post_images (
      storage_path,
      order_index
    )
  `
  )
  .order("shot_date", {ascending: true})

  if(error){
    console.error("post select error", error);
    return [];
  }

  return (
    data
      // 커버 이미지(order_index 가장 작은 것) 찾기
      .map((post) => {
        const images = (post.post_images ?? []).sort(
          (a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)
        );
        const cover = images[0];
        if (!cover) return null; // 이미지 없는 포스트는 메인에서 스킵

        const coverUrl =
          supabase.storage.from("images").getPublicUrl(cover.storage_path)
            .data.publicUrl;

        return {
          id: post.id,
          href: `/archive/${post.id}`, // 상세 페이지 라우트
          src: coverUrl,
          label: post.location || "Unknown",
          date: formatDateLabel(post.shot_date),
          description: post.description,
        };
      })
      .filter(Boolean) as {
        id: string;
        href: string;
        src: string;
        label: string;
        date: string;
        description: string | null;
      }[]
  );}
// 행마다 다른 빈칸 위치(0-based col index)
// 행 개수보다 적어도 자동으로 순환해서 사용됩니다.
const blankPatterns: Array<Set<number>> = [
  new Set([2, 4]), // row 0: 2,4 비움
  new Set([1, 5]), // row 1: 1,5 비움
  new Set([0, 3]), // row 2: 0,3 비움
]; 

export default async function Home() {
  const posts = await fetchPosts();
  const cells: React.ReactNode[] = [];
  let row = 0;
  let dataIdx = 0;

  // months를 다 소진할 때까지 행 단위로 채워 넣음
  while (dataIdx < posts.length) {
    const blanks = blankPatterns[row % blankPatterns.length];
    for (let col = 0; col < COLS; col++) {
      if (blanks.has(col)) {
        cells.push(
          <div
            key={`blank-${row}-${col}`}
            className="invisible aspect-[3/4]"
            aria-hidden
          />
        );
      } else {
        if (dataIdx >= posts.length) {
          // 아이템 소진 시 남는 칸은 그냥 빈칸 처리
          cells.push(
            <div
              key={`blank-end-${row}-${col}`}
              className="invisible aspect-[3/4]"
              aria-hidden
            />
          );
        } else {
          const m = posts[dataIdx++];
          cells.push(
            // <Link href={`/archive/${m.label.toLocaleLowerCase()}`} key={`${m.label}-${row}-${col}`} className="flex flex-col gap-2 cursor-pointer">
            //   <img src={m.src} alt={m.label} className="w-full h-auto object-cover" />
            //   <span className="text-xs font-bold uppercase tracking-wide text-neutral-800">
            //     {m.label}
            //   </span>
            // </Link>
            <ImageCard
            key={`${m.label}-${row}-${col}`}
            href={`/archive/${m.label.toLowerCase()}`}
            src={m.src}
            label={"Turkey"}            // 혹은 m.place 같은 필드로
            date={m.label}
          />
          );
        }
      }
    }
    row++;
  }

  return (
    <section className="px-10 pt-28">
      <div className="grid grid-cols-6 gap-10 auto-rows-fr">
        {cells}
      </div>
      <FloatingDock />
    </section>
  );
}