import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";

interface DraggableItemProps {
  id: string;
  src: string;
  onDelete: (id: string) => void;
  index: number;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, src, onDelete, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering drag events when clicking delete
    onDelete(id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-2 border border-[#d3d4d6] m-1 bg-white cursor-grab relative rounded-lg overflow-auto"
      {...attributes}
      {...listeners}
    >
      <Image src={src} alt={`Image ${index + 1}`} className="w-24 h-24 rounded-md" width={500} height={500} />
      <button
        onClick={handleDelete}
        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
      >
        &times;
      </button>
    </div>
  );
};

export default DraggableItem;
