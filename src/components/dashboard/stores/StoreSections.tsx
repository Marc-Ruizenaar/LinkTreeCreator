"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import Link from "next/link";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useStoreSections } from "@/context/StoreSectionsProviderContext";
import updateSectionPositions from "@/api/supabase/updateSectionPositions";

export default function StoreSections() {
  const { sections, setSections } = useStoreSections();
  const [isUpdating, setIsUpdating] = useState(false);

  const updateSection = async (updatedSections) => {
    try {
      setIsUpdating(true);

      // Prepare the position updates
      const updates = updatedSections.map((section, index) => ({
        id: section.id,
        position: index,
        user_id: section.user_id,
      }));

      await updateSectionPositions(updates);

      // Update context state
      setSections(updatedSections);
    } catch (error) {
      console.error("Error updating section positions:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newSections = [...sections];
    const [reorderedItem] = newSections.splice(result.source.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);

    // Update the database with new positions
    updateSection(newSections);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="store-sections">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-4"
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id.toString()}
                draggableId={section.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <Link
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    href={`section-${section.id.toString()}`}
                    className={`mt-4 flex select-none items-center gap-5 rounded-2xl p-4 transition-colors ${isUpdating ? "opacity-70" : "opacity-100"} ${snapshot.isDragging ? "bg-gray-200" : "bg-gray-100"} `}
                  >
                    <RxDragHandleDots2 size={30} />
                    <Image
                      className="aspect-square overflow-hidden rounded"
                      src={section.imageSrc}
                      alt=""
                      height={60}
                      width={60}
                    />
                    <h2 className="font-bold">{section.title}</h2>
                  </Link>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
