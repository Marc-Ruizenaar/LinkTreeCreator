import deleteSection from "@/api/supabase/delete/deleteSection";
import duplicationSection from "@/api/supabase/duplicationSection";
import sectionChangeDraft from "@/api/supabase/post/sectionChangeDraft";
import updateSectionPositions from "@/api/supabase/updateSectionPositions";
import { Sections } from "@/types/profile";
import { AiOutlineDelete } from "react-icons/ai";
import { BiHide } from "react-icons/bi";
import { HiOutlineDuplicate } from "react-icons/hi";
import { Dispatch, SetStateAction } from 'react';


interface ActiveSettingPopupProps {
  section: Sections;
  sections: Sections[];
  setSections: Dispatch<SetStateAction<Sections[]>>;
  setIsUpdating: (isUpdating: boolean) => void;
  setActiveSettingPopup: (popupId: string | null) => void;
}

export default function ActiveSettingPopup({
  section,
  sections,
  setSections,
  setIsUpdating,
  setActiveSettingPopup,
}: ActiveSettingPopupProps) {
  const handleDeleteSection = async (
    section_id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsUpdating(true);

      // Delete from database
      await deleteSection(section_id);

      // Remove from useState
      setSections(sections.filter((section: Sections) => section.id !== section_id));
    } catch (error) {
      console.error("Error updating section positions:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDuplicationSection = async (
    section_id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsUpdating(true);

      // Duplicate Section
      const duplicationSectionData = await duplicationSection(section_id);

      // Add to sections array and update positions
      const updatedSections = [...sections, ...duplicationSectionData].map(
        (section: Sections, index) => ({
          ...section,
          position: index,
        }),
      );

      // Update positions in the database
      const updates = updatedSections.map((section: Sections, index) => ({
        id: section.id,
        position: index,
        user_id: section.user_id,
      }));

      await updateSectionPositions(updates);

      // Update state with correctly positioned sections
      setSections(updatedSections);
    } catch (error) {
      console.error("Error duplicating section:", error);
    } finally {
      setIsUpdating(false);
      setActiveSettingPopup(null);
    }
  };

  const handleDraft = async (
    section_id: string,
    draft: boolean | undefined,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsUpdating(true);

      const setDraft = !draft;

      // Update section draft status
      await sectionChangeDraft(setDraft, section_id);

      // Update sections in state with the returned data
      setSections((prevSections: Sections[]) => {
        return prevSections.map((section: Sections) =>
          section.id === section_id ? { ...section, draft: setDraft } : section,
        );
      });
    } catch (error) {
      console.error("Error updating section draft status:", error);
    } finally {
      setIsUpdating(false);
      setActiveSettingPopup(null);
    }
  };

  return (
    <div className="absolute right-4 top-16 z-50 flex flex-col items-baseline rounded-lg bg-white p-4 shadow-lg">
      <button
        onClick={(e) => section.id && handleDuplicationSection(section.id, e)}
        className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-200"
      >
        <HiOutlineDuplicate size={20} />
        Duplicate section
      </button>
      <button
        onClick={(e) => section.id && handleDeleteSection(section.id, e)}
        className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-200"
      >
        <AiOutlineDelete size={20} />
        Delete section
      </button>
      <button
        onClick={(e) => section.id && handleDraft(section.id, section.draft, e)}
        className="flex w-full items-center gap-2 rounded p-2 text-left hover:bg-gray-200"
      >
        <BiHide />
        {section.draft ? "Publish section" : "Change to draft"}
      </button>
    </div>
  );
}