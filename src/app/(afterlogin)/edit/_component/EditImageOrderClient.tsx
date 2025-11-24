// app/(afterlogin)/edit/[id]/_component/EditImageOrderClient.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableThumb from "@/app/_component/SortableThumb";

type EditableImage = {
  id: string;          // post_images.id (문자열)
  order: number | null;
  url: string;
  file?: File;
};

type Props = {
  initialImages: EditableImage[];
};

export default function EditImageOrderClient({ initialImages }: Props) {
  const [images, setImages] = useState<EditableImage[]>(() =>
    initialImages.map((img, idx) => ({
      ...img,
      order: img.order ?? idx,
    }))
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🔥 서버로 보낼 JSON 문자열
  const [imagesOrderJson, setImagesOrderJson] = useState("");

  // images 상태가 바뀔 때마다 images_order hidden input용 JSON 업데이트
  useEffect(() => {
    const payload = images.map((img, idx) => ({
      id: img.id,
      order: idx, // 현재 배열 순서를 그대로 서버에 보내기
    }));
    setImagesOrderJson(JSON.stringify(payload));
  }, [images]);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setImages((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const moved = arrayMove(prev, oldIndex, newIndex);

      return moved.map((img, idx) => ({
        ...img,
        order: idx,
      }));
    });
  };

  const handleRemove = (id: string) => {
    setImages((prev) =>
      prev
        .filter((img) => img.id !== id)
        .map((img, idx) => ({
          ...img,
          order: idx,
        }))
    );
  };

  const handleClickAdd = () => {
    const el = fileInputRef.current;
    if (!el) return;
    el.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const startOrder = images.length;

    const next = files.map((file, idx) => ({
      id: `local-${startOrder + idx}-${crypto.randomUUID()}`,
      order: startOrder + idx,
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  return (
    <div className="space-y-3 border-t bg-white px-4 py-3">
      {/* 🔥 여기 hidden input 추가: formData.get("images_order") 로 들어감 */}
      <input type="hidden" name="images_order" value={imagesOrderJson} />

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