import { createClient } from "@/utils/supabase/client";

export default async function sectionPictureDatabase(
  fullUrl: string,
  user_id: string,
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("stores_sections")
    .update({ profilePicture: fullUrl })
    .eq("user_id", user_id);

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
