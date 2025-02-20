import { createClient } from "@/utils/supabase/client";

export default async function deleteSection(section_id: string) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from("stores_sections")
    .delete()
    .eq("id", section_id);

  if (error) {
    console.error("Error updating store profile:", error);
    throw error;
  }

  return data;
}
