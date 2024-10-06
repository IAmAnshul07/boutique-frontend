import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "@/components/draggable";
import { useFormContext } from "react-hook-form";

interface Image {
  id: string;
  src: string;
}

const DragAndDrop: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const items = watch("images") as Image[];
  console.log("IMAGES", items);
  console.log("WATCH in Dnd", watch());

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item: Image) => item.id === active.id);
      const newIndex = items.findIndex((item: Image) => item.id === over.id);
      console.log("Indices old -<", oldIndex);
      console.log("Indices new -<", newIndex);

      const newArr = arrayMove(items, oldIndex, newIndex);
      setValue(
        "images",
        newArr.map((value, idx) => ({ ...value, index: idx })),
      );
    }
  };

  const handleDelete = (id: string) => {
    setValue(
      "images",
      items.filter((item) => item.id !== id),
    );
  };

  return (
    !!items && (
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          {items.length > 0 && (
            <div className="flex overflow-x-auto w-[245%] px-1 py-1 border border-[#d3d4d6] justify-center rounded-lg mt-9">
              {items.map((item, index) => (
                <DraggableItem key={item.id} id={item.id} src={item.src} index={index} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
    )
  );
};

export default DragAndDrop;
