"use client";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useStoreSections } from "@/context/StoreSectionsProviderContext";
import updateSectionPositions from "@/api/supabase/updateSectionPositions";
import { Sections } from "@/types/profile";
import ActiveSettingPopup from "./ActiveSettingPopup";

export default function StoreSections() {
  const { sections, setSections } = useStoreSections();
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeSettingPopup, setActiveSettingPopup] = useState<string | null>(
    null,
  );

  const updateSection = async (updatedSections: Sections[]) => {
    try {
      setIsUpdating(true);
      const updates = updatedSections.map((section, index) => ({
        id: section.id,
        position: index,
        user_id: section.user_id,
      }));
      await updateSectionPositions(updates);
      setSections(updatedSections);
    } catch (error) {
      console.error("Error updating section positions:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newSections = [...sections];
    const [reorderedItem] = newSections.splice(result.source?.index, 1);
    newSections.splice(result.destination.index, 0, reorderedItem);
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
            {sections.map((section, index) =>
              section.id ? (
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
                      href={`/dashboard/store/section/${section.id?.toString()}`}
                      className={`relative mt-4 flex select-none items-center justify-between rounded-2xl p-4 transition-colors ${
                        isUpdating ? "opacity-70" : "opacity-100"
                      } ${snapshot.isDragging ? "bg-gray-200" : "bg-gray-100"} `}
                    >
                      <div className="flex items-center gap-5">
                        <RxDragHandleDots2 size={30} />
                        <Image
                          className="aspect-square overflow-hidden rounded object-cover"
                          src={section.imageSrc ?? "/placeholder.jpg"}
                          alt={section.title ?? ""}
                          height={60}
                          width={60}
                        />
                        <h2 className="font-bold">{section.title}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        {section.draft && (
                          <p className="rounded-xl bg-gray-200 p-2 font-semibold">
                            Draft
                          </p>
                        )}

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveSettingPopup(
                              activeSettingPopup === section.id
                                ? null
                                : (section.id as string),
                            );
                          }}
                          className="z-40 flex h-8 w-8 items-center justify-center"
                        >
                          <BsThreeDotsVertical size={20} className="mr-2" />
                        </button>
                      </div>

                      {/* Popup */}
                      {activeSettingPopup === section.id && (
                        <ActiveSettingPopup
                          sections={sections}
                          section={section}
                          setSections={setSections}
                          setIsUpdating={setIsUpdating}
                          setActiveSettingPopup={setActiveSettingPopup}
                        />
                      )}
                    </Link>
                  )}
                </Draggable>
              ) : null,
            )}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}
