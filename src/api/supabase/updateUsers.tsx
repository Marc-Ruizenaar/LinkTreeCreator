import { UserProfile } from "@/types/profile";
import { createClient } from "@/utils/supabase/client";

export default async function UpdateStoreProfileData(
  data: UserProfile,
  user_id: string,
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("stores")
    .update(data)
    .eq("user_id", user_id);

  if (error) {
    console.error("Error updating store profile:", error);
    throw error;
  }
}
