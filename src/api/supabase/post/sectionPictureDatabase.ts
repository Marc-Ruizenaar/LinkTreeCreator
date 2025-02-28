import { createClient } from "@/utils/supabase/client";

export default async function sectionPictureDatabase(
  fullUrl: string,
  currentSection: string,
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("stores_sections")
    .update({ imageSrc: fullUrl })
    .eq("id", currentSection);

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
