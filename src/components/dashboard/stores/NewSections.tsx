import { createNewSection } from "@/api/supabase/post/createNewSection";
import { useStoreSections } from "@/context/StoreSectionsProviderContext";
import { useUserProfile } from "@/context/UserProfileContext";
import { redirect } from "next/navigation";

export default function NewSections() {
  const { user } = useUserProfile();
  const { sections, setSections } = useStoreSections();

  if (!user) {
    return null;
  }

  const HandleNewSection = async () => {
    if (!user?.user_id) {
      console.error("User ID is undefined");
      return;
    }

    try {
      const getSection = await createNewSection(user.user_id);

      if (!getSection || getSection.length === 0) {
        console.error("Failed to create a new section");
        return;
      }

      const newSection = getSection[0];
      setSections([...sections, newSection]);

      redirect(`/dashboard/store/section/${newSection.id}`);
    } catch (error) {
      console.error("Error creating new section:", error);
    }
  };

  return (
    <>
      <button
        onClick={HandleNewSection}
        className="mt-4 block w-full rounded-xl bg-BlueMain px-5 py-3 font-bold text-white"
      >
        Add new section
      </button>
    </>
  );
}
