import { createClient } from "@/utils/supabase/client";

export default async function getStoreBasedOnUsername(params: string) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from("users")
    .select()
    .eq("username", params);

  if (error) {
    console.error("Error updating store profile:", error);
    throw error;
  }

  return data;
}
