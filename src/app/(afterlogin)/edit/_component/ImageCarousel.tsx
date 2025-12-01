// app/(afterlogin)/edit/[id]/_component/ImageCarousel.tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useState, useEffect } from "react";

type Image = {
  id: string;
  url: string;
};

type Props = {
  images: Image[];
};

export default function ImageCarousel({ images }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

   // 선택된 슬라이드 인덱스 동기화
   useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if(!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if(!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if(!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi])

  if (!images.length) return null;

  return (
    <div className="relative aspect-[4/5] w-full max-w-[380px] mx-auto overflow-hidden">
      {/* embla viewport */}
      <div className="h-full" ref={emblaRef}>
        {/* embla container */}
        <div className="flex h-full">
          {images.map((img) => (
            <div
              key={img.id}
              // 슬라이드 하나가 전체 너비를 차지하도록
              className="min-w-0 flex-[0_0_100%] h-full"
            >
              <img
                src={img.url}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {/* 좌우 화살표 버튼 */}
      <button
        type="button"
        onClick={scrollPrev}
        className="
          absolute left-3 top-1/2 -translate-y-1/2
          flex h-8 w-8 items-center justify-center
          rounded-full bg-white/80 shadow-md
          border border-neutral-200
          hover:bg-white hover:shadow-lg
          transition
        "
      >
        {/* 왼쪽 화살표 SVG */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="text-neutral-700"
        >
          <path
            fill="currentColor"
            d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={scrollNext}
        className="
          absolute right-3 top-1/2 -translate-y-1/2
          flex h-8 w-8 items-center justify-center
          rounded-full bg-white/80 shadow-md
          border border-neutral-200
          hover:bg-white hover:shadow-lg
          transition
        "
      >
        {/* 오른쪽 화살표 SVG */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="text-neutral-700"
        >
          <path
            fill="currentColor"
            d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"
          />
        </svg>
      </button>
          {/* 아래 동그라미 인디케이터 */}
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {scrollSnaps.map((_, index) => {
            const isActive = index === selectedIndex;

            return(
                <button
                    key={index}
                    type="button"
                    onClick={() => scrollTo(index)}
                    className={`
                        pointer-events-auto h-1.5 w-1.5 rounded-full border transition
                        ${isActive
                            ? "border-neutral-800 bg-neutral-800"
                            : "border-neutral-300 bg-neutral-100"
                        }
                        `}
                >

                </button>
            )
          })}
          </div>
    </div>
  );
}