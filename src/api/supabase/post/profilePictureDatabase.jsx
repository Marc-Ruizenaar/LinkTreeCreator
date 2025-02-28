import { createClient } from "@/utils/supabase/client";

export default async function profilePictureDatabase(fullUrl, user_id) {
  const supabase = createClient();

  const { error } = await supabase
    .from("stores")
    .update({ profilePicture: fullUrl })
    .eq("user_id", user_id);

  if (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
