import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "@/components/draggable";

interface Image {
  id: string;
  src: string;
}

interface DragAndDropProps {
  items: Image[];
  setItems: React.Dispatch<React.SetStateAction<Image[]>>;
}

const DragAndDrop: React.FC<DragAndDropProps> = ({ items, setItems }) => {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);

        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {items.length > 0 && (
          <div className="flex overflow-x-auto w-[245%] px-1 py-1 border border-[#d3d4d6] justify-center rounded-lg mt-9">
            {items.map((item) => (
              <DraggableItem key={item.id} id={item.id} src={item.src} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default DragAndDrop;
