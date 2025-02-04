import { createClient } from "@/utils/supabase/client";

export default async function getStores(params: string) {
  const supabase = createClient();

  const { error, data } = await supabase
    .from("stores")
    .select()
    .eq("displayname", params);

  if (error) {
    console.error("Error updating store profile:", error);
    throw error;
  }

  return data;
}
