// app/(afterlogin)/edit/[id]/EditImageOrderClient.tsx
"use client";

import { useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableThumb from "@/app/_component/SortableThumb";

type EditableImage = {
  id: string;
  order: number | null;
  url: string;
  file?: File;
};

export default function EditImageOrderClient({
  initialImages,
}: {
  initialImages: EditableImage[];
}) {
  const [images, setImages] = useState<EditableImage[]>(initialImages);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setImages((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const moved = arrayMove(prev, oldIndex, newIndex);

      // 필요하면 여기서 order도 다시 매겨 줄 수 있음
      return moved.map((img, idx) => ({
        ...img,
        order: idx,
      }));
    });
  };

  const handleRemove = (id: string) => {
    console.log("삭제 클릭 id: ", id)
    setImages((prev) => 
      prev.filter((img) => img.id !== id)
      .map((img, idx) => ({
        ...img,
        order: idx, // 삭제 후 order 다시 정렬
      }))
    )
  }

  const handleClickAdd = () => {
    const el = fileInputRef.current;
    if(!el) return;
    el.click();
    }
    // 파일 선택되었을 때 썸네일 리스트에 추가
    const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        // images에 추가해야할 것 같음
        const files = Array.from(e.target.files ?? []);
        console.log('[onPickFiles] files:', files.map(f => ({ name: f.name, type: f.type, size: f.size })));

        
        if(!files.length) return;

        const startOrder = images.length;

        const next = files.map((file, idx) => ({
            id: `local-${startOrder + idx}-${crypto.randomUUID()}`,
            order: startOrder + idx,
            url: URL.createObjectURL(file),
            file,
        }))
        console.log(">> ", next)

        setImages((prev) => [...prev, ...next])

        // 같은 파일 다시 선택할 수 있게 초기화
        e.target.value = "";
    }
    return (
    <div className="space-y-3 border-t bg-white px-4 py-3">
      <div className="flex items-center justify-between text-[11px] text-neutral-500">
        <span className="font-medium uppercase tracking-[0.18em]">
          Order
        </span>
        <span>드래그해서 순서를 바꿔보세요.</span>
      </div>

        <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={handleFileSelected}
        />
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((img) => img.id)}
          strategy={horizontalListSortingStrategy}
        >
          <ul className="flex gap-3 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <SortableThumb
                key={img.id}
                id={img.id}
                src={img.url}
                index={idx + 1}
                onRemove={handleRemove}
              />
            ))}

            {/* 이미지 추가 버튼 (나중에 업로드 기능 연결) */}
            <li>
              <button
                type="button"
                onClick={handleClickAdd}
                className="flex h-28 w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-neutral-300 bg-neutral-50 text-[11px] text-neutral-500 transition hover:border-neutral-500 hover:bg-neutral-100"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-400">
                  <span className="relative block h-3 w-3">
                    <span className="absolute left-1/2 top-0 h-3 w-[1px] -translate-x-1/2 bg-neutral-500" />
                    <span className="absolute left-0 top-1/2 h-[1px] w-3 -translate-y-1/2 bg-neutral-500" />
                  </span>
                </span>
                <span>이미지 추가</span>
              </button>
            </li>
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}