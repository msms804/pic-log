import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect } from "react";

type SortableThumbProps = {
  id: string;
  src: string;
  index: number;
  onRemove?: (id: string) => void;
}
export default function SortableThumb({ id, src, index, onRemove }: SortableThumbProps) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id });
  
    const style: React.CSSProperties = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : undefined,
    };
    useEffect(() => {
        if(isDragging) console.log("dragging: ", id);
    }, [isDragging, id])

    const handleClickDelete = (e: React.MouseEvent) => {
      e.stopPropagation(); // 드래그 이벤트랑 섞이지 않도록
      e.preventDefault();
      if (!onRemove) return;
      onRemove(id)
    }
    return (
      <li
        ref={setNodeRef}
        style={style}
        className="relative w-28 h-28 shrink-0 cursor-grab active:cursor-grabbing"
      >
        {/* 드래그 핸들: 이미지 전체를 버튼으로 감싸서 여기만 드래그 되게 */}
        <button
          type="button"
          className="block w-full h-full cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <img
            src={src}
            alt={`preview-${index}`}
            className="w-full h-full object-cover rounded-lg border"
            draggable={false}
          />
        </button>
        <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded bg-black/70 text-white">
          #{index}
        </span>

        <button 
        type="button"
        onClick={handleClickDelete}
        className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow hover:bg-red-600"
        >
          ×
        </button>
      </li>
    );
  }