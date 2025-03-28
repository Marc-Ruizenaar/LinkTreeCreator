import { createClient } from "@/utils/supabase/client";

export default async function getSectionsPublic(user_id: string) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from("stores_sections")
    .select()
    .eq("user_id", user_id);

  if (error) {
    console.error("Error updating store profile:", error);
    throw error;
  }

  return data;
}
