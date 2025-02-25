import { createClient } from "@/utils/supabase/client";

export default async function sectionChangeDraft(setDraft, currentSection) {
  const supabase = createClient();

  console.log(setDraft);

  const { error, data } = await supabase
    .from("stores_sections")
    .update({ draft: setDraft })
    .eq("id", currentSection)
    .select();

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }

  return data;
}
