export default function EditPage() {
    const mockPost = {
      shot_date: "2024-01-01",
      location: "Istanbul, Turkey",
      description: "골목 어딘가, 조용한 오후.",
      images: [
        { id: "1", url: "/1.jpeg" },
        { id: "2", url: "/2.jpeg" },
        { id: "3", url: "/3.jpeg" },
      ],
    };
  
    return (
      // 전역 헤더(fixed) 만큼 아래에서 시작하도록 pt-24 추가
      <main className="min-h-screen bg-neutral-50 pt-12">
  
        {/* ─────────────────────────────
            컨텐츠 영역
        ───────────────────────────── */}
        <div className="mx-auto grid max-w-5xl gap-8 px-6 pb-16 pt-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* 왼쪽: 이미지 / 썸네일 편집 */}
          <section className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
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
                  {mockPost.images.length} photos
                </span>
              </div>
  
              {/* 메인 미리보기 */}
              <div className="bg-neutral-100">
                <div className="aspect-[4/5] w-full max-w-[380px] overflow-hidden">
                  <img
                    src={mockPost.images[0]?.url}
                    alt="main preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
  
              {/* 썸네일 리스트 */}
              <div className="space-y-3 border-t bg-white px-4 py-3">
                <div className="flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="font-medium uppercase tracking-[0.18em]">
                    Order
                  </span>
                  <span>드래그해서 순서를 바꿔보세요.</span>
                </div>
  
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {mockPost.images.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      className="group relative flex h-24 w-24 shrink-0 cursor-grab flex-col overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 text-left shadow-sm transition hover:border-black/70"
                    >
                      {/* 드래그 핸들 모양 */}
                      <span className="pointer-events-none absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-full bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white">
                        <span className="inline-flex flex-col gap-[2px]">
                          <span className="block h-[1px] w-3 bg-white/80" />
                          <span className="block h-[1px] w-3 bg-white/80" />
                          <span className="block h-[1px] w-3 bg-white/80" />
                        </span>
                        #{idx + 1}
                      </span>
  
                      {idx === 0 && (
                        <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-black">
                          대표
                        </span>
                      )}
  
                      <img
                        src={img.url}
                        alt={`thumb-${idx}`}
                        className="h-full w-full object-cover transition group-hover:scale-[1.03]"
                      />
                    </button>
                  ))}
  
                  {/* 이미지 추가 버튼 */}
                  <button
                    type="button"
                    className="flex h-24 w-24 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-[11px] text-neutral-500 transition hover:border-neutral-500 hover:bg-neutral-100"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-400">
                      <span className="relative block h-3 w-3">
                        <span className="absolute left-1/2 top-0 h-3 w-[1px] -translate-x-1/2 bg-neutral-500" />
                        <span className="absolute left-0 top-1/2 h-[1px] w-3 -translate-y-1/2 bg-neutral-500" />
                      </span>
                    </span>
                    <span>이미지 추가</span>
                  </button>
                </div>
              </div>
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
                    type="date"
                    defaultValue={mockPost.shot_date}
                    className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:bg-white"
                  />
                </div>
  
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue={mockPost.location}
                    placeholder="City, Country"
                    className="w-full rounded-lg border border-neutral-300 bg-neutral-50 px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:bg-white"
                  />
                </div>
  
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    defaultValue={mockPost.description}
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
              <button
                type="button"
                className="rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 cursor-pointer hover:bg-red-100"
              >
                Delete
              </button>
              <button
                type="button"
                className="rounded-full bg-black px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white cursor-pointer hover:opacity-90"
              >
                Save changes
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }